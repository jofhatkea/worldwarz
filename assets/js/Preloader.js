/**
 * Created by holbech on 12/06/2017.
 */
class Preloader {
    constructor(manifest, callback, stage){
        this.queue = new createjs.LoadQueue(true);
        this.queue.loadManifest(manifest);
        this.callback = callback;
        this.stage=stage;
        this.queue.on("progress", this.progress.bind(this));
        this.queue.on("complete", this.cleanUp.bind(this));
        this.box = new createjs.Container();
        this.stage.addChild(this.box);
    }
    //TODO, full ticker so we can animate it nicely
    progress(e){
        this.box.removeAllChildren();
        for(let i=0; i<Math.round(e.progress*100); i++){
            let t = new createjs.Shape();
            t.graphics.beginFill("#FFF").drawCircle(0,0,5);
            t.x=this.stage.canvas.width / 100 * i +5;
            t.y=300;
            this.box.addChild(t);

        }
        this.stage.update(e)

    }
    cleanUp(e){

        this.stage.removeAllChildren();
        this.stage.update(e);
        this.callback();
    }
}