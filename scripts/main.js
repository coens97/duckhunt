/* 
    Open source!!!

    Duck hunt HTML5
    Copyright (C) 2012  Coen Stange & Sebastiaan Hoevers & Jeroen Vervoort & Ramon Schreuders

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/
requirejs([//put here the other files that need to be included
    "sprites/basic",
    "sprites/dog",
    "sprites/duck",
    "sprites/scoreboard",
    "scenes/menuScene",
    "scenes/gameScene",
    "rounds",
    "highscore"
    ], function() {//when other scripts are loaded we can get started!
    console.log("Other scripts loaded");
    frameCounter = new FrameCounter();

    //scenes can't be loaded before other scripts are loaded
    gameState = 0;//is the game in menu or in gameplay
    menuScene = new MenuScene();
    gameScene = new GameScene();    
    scenes = [menuScene,gameScene];
    init();//initialise the game
});
/*****************
* global variables 
*****************/
var c = document.getElementById("myCanvas");//get canvas element
var ctx = c.getContext("2d");//get content of canvas element to draw into it

var scale;//How much is it zoomed in is it the half size then it is 0.5
var windowWidth;//the width of the client view but the canvas width is 800 
var windowHeight;//the height of the client view but the canvas height is 600

var gameInterval;//call evry 16 ms for 60 fps the function mainGameLoop, the iinterval is created in init()

var frameCounter = new FrameCounter();

var gameState;
var menuScene;//look above in requirejs() for more info
var gameScene;    
var scenes;


//scores
var gameScore = 0;
var gameBullets = 3;


/************
 * Start code here
 ************/
function mainGameLoop(){//this function will be called evry 16 ms
    scenes[gameState].loop();//call the loop fucntion of current canvas
    mainDraw();
   
}

function mainDraw(){
    ctx.clearRect (0,0,800,600);//clear the canvas
    scenes[gameState].draw();
    frameCounter.count();
}

function mainMouseDown(e){//when there is clicked on canvas
    //Change it to canvas coordinate
    var tmpX = (e.pageX - c.offsetLeft)*scale;
    var tmpY = (e.pageY - c.offsetTop)*scale;
    console.log("Clicked x:"+tmpX+" y:"+tmpY);
    //done calculating
    scenes[gameState].mouseDown(tmpX,tmpY);
}

/******************
 * Frame counter
 *****************/
function FrameCounter(){
    this.frame = 0;
    this.count = function(){
        this.frame++;
        if(this.frame >=60){
            this.frame = 0;            
        }
    };    
}
/******************
* basic code
******************
* other functions
* ***************/
function init(){
    console.log("init game");
    resizeCanvas();//scale canvas    
    gameInterval = self.setInterval(function(){mainGameLoop();},16);//call mainGameLoop() evry 16 ms
    
    /**************
     * Create eventlisener for when there is clicked on the screen
     * It also checks if it has touchscreen like iPad, that makes it work better on those devices
     * 1f u c4n r34d th1s u r34lly n33d t0 g37 l41d
     ************/
    if ('ontouchstart' in document.documentElement) {
            c.addEventListener("touchstart", mainMouseDown, false);
        }
        else {
            c.addEventListener("click", mainMouseDown, false);
        }
}

window.onresize = function(event) {//when canvas resize resize canvas
   resizeCanvas();
};

function resizeCanvas(){//resize canvas to aspect ratio
    windowWidth = document.body.offsetWidth;
    windowHeight = document.body.offsetHeight;
    
    //c.style.width = windowWidth + "px";//old code
    //c.style.height = windowHeight + "px";//use this code to not use aspect ratio
    
    //start aspect ratio
    var tmpHeight = windowHeight;
    var tmpWidth = windowHeight * 4 /3;
    scale = 600 / windowHeight;
    if(tmpWidth > windowWidth){//when width of canvas is bigger then window
        tmpWidth = windowWidth;
        tmpHeight = windowWidth * 3 / 4;
        scale = 800 / windowWidth;
    }
    c.style.width = tmpWidth + "px";
    c.style.height = tmpHeight + "px";
}

document.ontouchmove = function(e) {//when on device with touchscreen want to scroll
    e.preventDefault();
};

/* no comment */
