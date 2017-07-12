/**
 * Created by holbech on 12/06/2017.
 */
class Hero extends createjs.Shape {
    constructor(color,x,y, keycodes){
        super();
        this.graphics.beginFill(color).drawCircle(0,0,10);
        this.x=x;
        this.y=y;
        this.radius=10;

        this.keys = {
            l:false,
            r:false,
            u:false,
            d:false
        };
        this.firing=false;
        this.aimX=null;
        this.aimY=null;
        this.speed=SETTINGS.heroSpeed;
        this.weapon = new Weapon(600, 5, 5, 3);

        window.addEventListener('keyup', e=>{
           switch(e.keyCode){
               case keycodes.u:
                   this.keys.u=false;
                   break;
               case keycodes.r:
                   this.keys.r=false;
                   break;
               case keycodes.d:
                   this.keys.d=false;
                   break;
               case keycodes.l:
                   this.keys.l=false;
                   break;
           }
        });
        window.addEventListener('keydown', e=>{
            switch(e.keyCode){
                case keycodes.u:
                    this.keys.u=!false;
                    break;
                case keycodes.r:
                    this.keys.r=!false;
                    break;
                case keycodes.d:
                    this.keys.d=!false;
                    break;
                case keycodes.l:
                    this.keys.l=!false;
                    break;
            }
        });
    }
    fire(){
        this.weapon.reloadCounter--;
        if(this.firing && this.weapon.reloadCounter<1){
            this.weapon.reloadCounter=this.weapon.reloadSpeed;
            return new Bullet(this, {x:this.aimX, y:this.aimY}, this.weapon.speed, this.weapon.strength, this.weapon.damage);
        }
        return null;
        /**/
    }
    /*willHit(rect2){
        if ( this.nextX >= rect2.x + rect2.width
            || this.nextX + this.width <= rect2.x
            || this.nextY >= rect2.y + rect2.height
            || this.nextY + this.height <= rect2.y )
        {
            return false;
        }
        return true;
    }*/

    move(){
        this.nextX=this.x;
        this.nextY=this.y;
        if(this.keys.l){
            this.nextX-=this.speed;
        }
        if(this.keys.r){
            this.nextX+=this.speed;
        }
        if(this.keys.u){
            this.nextY-=this.speed;
        }
        if(this.keys.d){
            this.nextY+=this.speed;
        }
        let canWalk = true;
        /*
        blocks.some(row=>{
            row.forEach(b=>{
                if(b.passable){//skip all passable blocks
                    return false;
                }
                if(this.willHit(b)){
                    canWalk = false;
                    return true;//since we're using some, it should short circuit the loop, not sure it works with the double loop though
                }
            });
        });*/
        if(canWalk){
            this.x=this.nextX;
            this.y=this.nextY;
        }
    }
}
