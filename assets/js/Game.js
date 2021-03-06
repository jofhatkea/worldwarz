/**
 * Created by holbech on 12/07/2017.
 */
class Game {
    constructor(canvasid){
        this.stage = new createjs.Stage(canvasid);
        this.tick=this.tick.bind(this);
        this.preloader=new Preloader("assets/data/preload.json", this.preloaded.bind(this), this.stage);
        this.zombies=[];
        this.bullets=[];
        this.blocks=[];
    }
    preloaded(e){
        console.log("preloaded", this)
        createjs.Ticker.setFPS(60);
        createjs.Ticker.addEventListener('tick', this.tick);
        this.setup();
        let gameMode = Math.floor(Math.random()*1);

        switch(gameMode){
            case 0://survive X zombies
                //TODO ?
                break;
        }

    }
    setup(){
        this.hero = new Hero('blue', 400, 150, {l:37, u:38, r:39, d:40});
        this.stage.addChild(this.hero);
        const canvas = document.querySelector('#action')
        canvas.addEventListener('mousedown', e=>{
            this.hero.firing=true;
            this.hero.aimX=e.offsetX;
            this.hero.aimY=e.offsetY;
        });
        canvas.addEventListener('mouseup', e=>{
            this.hero.firing=false;
        });
        canvas.addEventListener('mousemove', e=>{
            this.hero.aimX=e.offsetX;
            this.hero.aimY=e.offsetY;
        });

        for(let i=10; i>=0; i--){
            let z = new Zombie().setRandom({width:this.stage.canvas.width, height:this.stage.canvas.height});
            setTimeout(()=>{
                this.stage.addChild(z);
                this.zombies.push(z);
            }, i*100)
        }
        let b = new Block('red', 100, 100, 300, 50);
        this.stage.addChild(b);
        this.blocks.push(b);
    }
    tearDown(){
        console.log("tearDown called")
        //document.querySelector('#action').classList.remove("overlay");

    }
    moveZombies(){
        this.zombies.forEach(z=>{
            z.move(this.hero, this.blocks)
        });
    }
    moveBullets(){
        this.bullets.forEach((b,i)=>{
            if(!b.alive){
                this.stage.removeChild(b);
                this.bullets.splice(i,1)
            } else {
                b.move();
            }
        });
    }
    heroFires(){
        let b = this.hero.fire()
        if(b){
            this.bullets.push(b);
            this.stage.addChild(b)
        }
    }
    hitDetection(){
        this.zombiesBullets();
        this.zombiesHero();
        this.bulletsBlocks();
    }

    bulletsBlocks(){
        for(let bl = this.blocks.length-1; bl>=0; bl--){
            for(let bu = this.bullets.length-1; bu>=0; bu--) {
                if(this.blocks[bl].isTouching(this.bullets[bu])){
                    this.blocks[bl].life-=this.bullets[bu].damage;
                    this.stage.removeChild(this.bullets[bu]);
                    this.bullets.splice(bu, 1);
                    if(this.blocks[bl].life<1){
                        this.stage.removeChild(this.blocks[bl]);
                        this.blocks.splice(bl, 1);
                    }
                }
            }
        }
    }
    zombiesHero(){
        this.zombies.forEach(z=>{
           if(Utils.distance(z,this.hero)<20){
               console.log("dead");
               this.tearDown();
           }
        });
    }
    zombiesBullets(){
        for(let z=this.zombies.length-1; z>=0; z--){
            for(let b = this.bullets.length-1; b>=0; b--){
                if(Utils.distance(this.bullets[b],this.zombies[z])<11){
                    this.zombies[z].lives-=this.bullets[b].damage;
                    this.stage.removeChild(this.bullets[b])
                    this.bullets.splice(b,1);
                    if(this.zombies[z].lives<1){
                        this.stage.removeChild(this.zombies[z]);
                        this.zombies.splice(z,1);
                        if(this.zombies.length===0){
                            this.tearDown()
                        }
                    }
                    break;
                }
            }
        }
    }
    tick(e){
        this.moveZombies();
        this.moveBullets();
        this.heroFires();
        this.hitDetection();
        this.hero.move();
        this.stage.update(e);
    }
}