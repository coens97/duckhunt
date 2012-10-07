function ducks(count){//give the input of the count of ducks, this object will contain more ducks 
    this.flyingAway = false;
    this.theDucks = [];//creat array to put them in
    for(var i = 0; i < count;i++){//create the count of ducks
        this.theDucks.push(new duck());//add duck to array    
    }
    this.loop = function(){
        for(var i = 0;i < this.theDucks.length;i++){
            this.theDucks[i].loop();    
        }
    };    
    this.draw = function(){
        for(var i = 0;i < this.theDucks.length;i++){
            this.theDucks[i].draw();    
        }
    };
    this.init = function(){
        this.flyingAway = false;
        for(var i = 0;i < this.theDucks.length;i++){
            this.theDucks[i].init();    
        }        
    };
    this.letFly = function(){//lket the ducks fly away
        this.flyingAway = true;
        for(var i = 0;i < this.theDucks.length;i++){
            this.theDucks[i].flyingAway = true;    
        }
    };
}
function duck(){
    /*** TODO: create ducks beahivior and how to draw it ***/
    this.x;
    this.y;
    this.speed = 4;
    this.frame = 0;
    this.duckDead;
    this.flyingAway = false;
    
    this.duckDirection;
    this.duckDirections = {0:0, 1:3, 2:3, 3:1, 4:2, 5:2};
     /*** duckDiretcion ****
      * 0:leftUpup/0
      * 1:leftUp/3
      * 2:leftDown/3
      * 3:rightUpUp/1
      * 4:rightUp/2
      * 5:rightDown/2
      ***********************/
     
    //bounds the position on the screen where the duck goes another direction
    this.topBound;this.bottomBound;this.rightBound;this.leftBound;
    this.newTopBound = function(){this.topBound = 100 - Math.random() * 100;};
    this.newBottomBound = function(){this.bottomBound = 325 + Math.random() * 100;};
    this.newLeftBound = function(){this.leftBound = 250 - Math.random() * 250;};
    this.newRightBound = function(){this.rightBound = 550 + Math.random() * 250;};
    
    
    this.theImage = new Image();
    this.theImage.onload = function() {//callback for when image loaded 
        console.log("image duck loaded");
    };
    this.theImage.src = "images/theDuck.png";
    
    this.init = function(){//start duck again
        this.x = 200 + Math.random() * 400;
        this.y = 425;
        this.newTopBound();this.bottomBound = 600;this.newLeftBound();this.newRightBound();
        this.duckDead = false;
        this.flyingAway = false;
        this.duckDirection = [0,1,3,4][Math.round(Math.random()*3)];//random direction upwards
    };
    this.init();//put the values in variables
    
    this.loop = function(){
        if(this.flyingAway&&!this.duckDead){
            this.flyAway.loop();
            return;
        }
        if(gameScene.sceneState != 1&&!this.duckDead){//let the duck hit the ground while dog is catching it
            return;    
        }
        if(this.duckDead){
            this.dead.loop();
            return;
        }
        //move the bird with the current state
        switch(this.duckDirection){
            case 0://leftUpUp
                this.x -= this.speed;
                this.y -= this.speed;
                break;
            case 1://leftUp
                this.x -= this.speed * 1.5;
                this.y -= this.speed * 0.8;
                break;
            case 2://leftDown
                this.x -= this.speed * 1.5;
                this.y += this.speed * 0.8;
                break;
            case 3://righUpUp
                this.x += this.speed;
                this.y -= this.speed;
                break;
            case 4://rightUp
                this.x += this.speed * 1.5;
                this.y -= this.speed * 0.8;
                break;
            case 5://rightDown
                this.x += this.speed * 1.5;
                this.y += this.speed * 0.8;
                break;
            default:
                break;
        }
        //dont let the bird fly out of the window 800/600
        if(this.x + 75 > this.rightBound){//right side
            this.duckDirection = [0,1,2][Math.round(Math.random()*2)];//get random direction  
            if(this.duckDirection == 2){//if going down
                this.newBottomBound();    
            }else{//when going up
                this.newTopBound();
            }
            this.newLeftBound();
        }
        if(this.x < this.leftBound){//left side
            this.duckDirection = [3,4,5][Math.round(Math.random()*2)];    
            if(this.duckDirection == 5){//if going down
                this.newBottomBound();    
            }else{//when going up
                this.newTopBound();
            }
            this.newRightBound();
        }
        if(this.y < this.topBound){//top side
            this.duckDirection = [2,5][Math.round(Math.random()*1)];
            if(this.duckDirection == 5){//if going right
                this.newRightBound();    
            }else{//when going left
                this.newLeftBound();
            }
            this.newBottomBound();
        }
        if(this.y + 75 > this.bottomBound){//bottom side
            this.duckDirection = [0,1,3,4][Math.round(Math.random()*3)];
            if(this.duckDirection == 3 || this.duckDirection == 4){//if going right
                this.newRightBound();    
            }else{//when going left
                this.newLeftBound();
            }
            this.newTopBound();
        }
    };    
    this.draw = function(){
        if(this.flyingAway&&!this.duckDead){
            this.flyAway.draw();
            return;
        }
        if(gameScene.sceneState != 1&&!this.duckDead){
            return;    
        }
        if(this.duckDead){
            this.dead.draw();
            return;
        }
        ctx.drawImage(this.theImage,
                        this.frame * 75,
                        this.duckDirections[this.duckDirection] * 74,
                        75,75,this.x,this.y,75,75);
        if(frameCounter.frame %  5== 0){//the sprite don't need to change evry frame
            this.frame++;
            if(this.frame >= 3){//if last frame
                this.frame = 0;    
            }
        }
    };
    this.dead = {
        parent:this,
        state:0,
        start:true,
        frame:0,
        loop:function(){
            if(this.state == 1){
                this.parent.y +=8;
            }else if(this.state==0&&this.start){//init code
                this.start = false;
                setTimeout(function(thisObj){thisObj.state = 1;//wait a little time before falling down  
                    },500,this);
            }
        },
        draw : function(){
            if(this.state == 0){//if just shot
                ctx.drawImage(this.parent.theImage,0,74*4,75,75,this.parent.x,this.parent.y,75,75);
                return;//don't draw falling
            }
            ctx.drawImage(this.parent.theImage,
                        this.frame * 75,
                        74*5,75,75,this.parent.x,this.parent.y,75,75);
                        
            if(frameCounter.frame %  5== 0){//the sprite don't need to change evry frame
                this.frame++;
                if(this.frame >= 3){//if last frame
                this.frame = 0;    
                }
            }
        }
    };
    this.flyAway = {
        parent:this,
        frame:0,
        loop:function(){
            this.parent.y -=8;
        },
        draw : function(){
            ctx.drawImage(this.parent.theImage,
                        this.frame * 75,
                        74,75,75,this.parent.x,this.parent.y,75,75);
                        
            if(frameCounter.frame %  5== 0){//the sprite don't need to change evry frame
                this.frame++;
                if(this.frame >= 3){//if last frame
                this.frame = 0;    
                }
            }
        }        
    };
}