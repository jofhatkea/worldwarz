/**
 * Created by holbech on 13/06/2017.
 */
class Bullet extends createjs.Shape {
    constructor(start,target, speed, strength, damage){
        super();
        this.graphics.beginFill("black").drawCircle(0, 0, 1);
        this.radius=1;
        this.x=start.x;
        this.y=start.y;

        let d = Utils.getDelta(start, target, speed);
        this.strength=strength;
        this.damage=damage;
        this.dx=d.dX;
        this.dy=d.dY;
        this.alive=true;
        this.modifier = Math.abs(this.dx) + Math.abs(this.dy);

    }
    move(){
        this.x+=this.dx;
        this.y+=this.dy;
        this.strength-=this.modifier;
        if(this.strength<0){
            this.alive=false;
        }
    }
}