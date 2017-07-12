/**
 * Created by holbech on 12/07/2017.
 */
let world;
let SETTINGS;
window.addEventListener('DOMContentLoaded', ()=>{
    "use strict";
    fetch("assets/gfx/worldLow.svg")
        .then(e=>e.text())
        .then(data=>{
            document.querySelector('#map').innerHTML=data;
            world = new World();
            let scripts = ['lib/createjs-2015.11.26.min.js', 'js/Game.js', 'js/Preloader.js'];
            scripts.forEach(s=>{
                let my_awesome_script = document.createElement('script');
                my_awesome_script.setAttribute('src',`assets/${s}`);
                document.head.appendChild(my_awesome_script);//TODO check whether they're finished before starting game
            })
        });
});
class World {
    constructor(){
        this.countries = document.querySelectorAll('#map .land');
        this.info = document.querySelector("#info");
        let data = localStorage.getItem('wwzData');
        if(data){

        } else {
            //console.log(this.countries);
            this.countries.forEach(c=>{
                c.dataset.population=Math.floor(Math.random()*100000000)+5000000;
                c.dataset.infested=Math.floor(Math.random()*100)
            })
        }
        this.setup();
    }
    setup(){
        this.countries.forEach(c=>{
            c.addEventListener('mouseover', e=>{
                this.info.querySelector('h1').textContent=e.target.getAttribute('title');
                this.info.querySelector('h2:nth-child(2) span').textContent=e.target.dataset.population;
                this.info.querySelector('h2:nth-child(3) span').textContent=e.target.dataset.infested;
                this.info.style.left=e.x+50+"px";
                this.info.style.top =e.y+"px";
                this.info.style.display="block";
            });
            c.addEventListener('mouseleave', e=>{
                this.info.style.display="none";
            });
            c.addEventListener('click', e=>{
                console.log(e.target);
                SETTINGS = {
                    heroSpeed: 3,
                    zombieSpeed: 1,
                    bulletSpeed: 5
                };
               let game = new Game("action");
            })
        })
    }
}