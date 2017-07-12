/**
 * Created by holbech on 12/07/2017.
 */
class Block extends createjs.Shape {
    constructor(color, x, y, width, height, life=1000){
        super();
        this.graphics.beginFill(color).drawRect(0,0,width,height);
        this.width=width;
        this.life=life;
        this.height=height;
        this.x=x;
        this.y=y;
    }
    isTouching(o){
        if(
            o.x+o.radius < this.x ||
            o.x-o.radius > this.x+this.width ||
            o.y+o.radius < this.y ||
            o.y-o.radius > this.y+this.height
        ){
            return false;
        }
        return true;
    }
}