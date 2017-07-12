/**
 * Created by holbech on 13/06/2017.
 */
class Zombie extends createjs.Shape {
    constructor(){
        super();
        this.graphics.beginFill("grey").drawCircle(0, 0, 10);
        this.radius=10;
        this.x=200;
        this.y=200;
        this.damage=10;
        this.speed=SETTINGS.zombieSpeed;
        return this;
    }
    setRandom(bounds){
        let r = Math.floor(Math.random()*4);
        this.x=Math.floor(Math.random()*bounds.width);
        this.y=Math.floor(Math.random()*bounds.height);
        switch(r){
            case 0:
                this.x=-100
                break;
            case 1:
                this.y=-100;
                break;
            case 2:
                this.x=bounds.width+100;
                break;
            case 3:
                this.y=bounds.height+100;
                break;
        }
        return this;
    }
    move(target, obstacles){
        let d = Utils.getDelta(this, target, this.speed);
        let nextPos = {
            x:this.x+d.dX,
            y:this.y+d.dY,
            radius:this.radius
        };
        let canMove=true;
        //TODO switch to forloop, can't break forEach (without throwing an exception)
        obstacles.forEach(o=>{
            if(o.isTouching(nextPos)){
                canMove=false;
            }
        });
        if(canMove){
            this.x+=d.dX;
            this.y+=d.dY;
        }

    }
}