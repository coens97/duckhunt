function dog(){
    /*** TODO: create dogs beahivior and how to draw it ***/
    this.parent = this;
    this.x = 50;
    this.y = 415;
    
    this.frame = 0;//current frame
    this.dogState = 0;//the dog has more states walking,jumping and caught ducks
    this.states = [];/*** the states are put at the end because the objects weren't created yet ***/
    //this.running = true;
    
    this.theImage = new Image();
    this.theImage.onload = function() {//callback for when image loaded 
        console.log("image dog loaded");
    };
    this.theImage.src = "images/dogSniffJump.png";
    
    this.loop = function(){
        /*** TODO:call the loop in which state it is ***/
        if(gameScene.sceneState == 0){
            this.states[this.dogState].loop();
        }
    };
        
    this.draw = function(){
        /*** TODO:draw dog in which state it is ***/ 
        if(gameScene.sceneState == 0){
            this.states[this.dogState].draw();
        }
    };
    
    //walking sprite
    this.walking = { //gor dogState = 0
        parent:this,//so we could get variables from the parent object
        frame : 0,
        jumpX : 300,
        stop : false,
        draw : function(){
            ctx.drawImage(this.parent.theImage,125*this.frame,0,125,138,this.parent.x,this.parent.y,125,138);//cut out the current frame
            if(frameCounter.frame % 5 == 0 && !this.stop){//the sprite don't need to change evry frame
                this.frame++;
                if(this.frame >= 5){
                    this.frame = 0;    
                }
            }
        },//end draw function
        loop : function(){
            /*this.x+=2;//this is the old loop when the dogs walks infinite
            if(this.x>800){
                this.x = -125;
            }*/
            if(!this.stop){
                this.parent.x += 2;
            }
            //when he is done walking go to jump
            if(this.parent.x > 300 && !this.stop){
                this.stop = true;
                this.frame = 5;//change frame
                
                setTimeout(function(thisObj){thisObj.parent.dogState = 1;//wait a little time before jumping  
                },350,this);
                
            }
        }
    }
    
    this.jumping = { //for dogState = 1
        parent:this,//so we could get the parent object
        goUp : true,
        draw : function(){
            ctx.drawImage(this.parent.theImage,
                            125*(this.goUp?6:7),
                            0,125,138,this.parent.x,this.parent.y,125,138);//cut out the current frame
            if(!this.goUp){
                //draw other object over dog
                gameScene.sprites.bg.draw();//draw the background over it
                gameScene.sprites.scoreBg.draw();
                gameScene.sprites.score.draw();
                gameScene.sprites.scoreBoard.draw();
            }
        },//end draw function
        loop : function(){
            this.parent.x += 1;
            this.parent.y-= this.goUp?4:-4;//if goup is true do 2 else do -2
            if(this.parent.y < 325&&this.goUp){
                this.goUp = false;
            }
            if(this.parent.y > 420&&!this.goUp){
                gameScene.sceneState = 1;
            }
        }
    };    
    this.states = [this.walking,this.jumping];
}

function catchingDog(){
    this.x = 440;
    this.y = 432;
    this.pause = false;
    this.ducks = 1;
    this.goUp = true;
    
    this.theImage = new Image();
    this.theImage.onload = function() {//callback for when image loaded 
        console.log("image catchingdog loaded");
    };
    this.theImage.src = "images/dog.png";
    
    this.draw = function(){
        if(gameScene.sceneState == 2){
            this.drawDog(0);
        }
    };
    this.loop = function(){
        if(gameScene.sceneState == 2 && !this.pause){
            this.y -= this.goUp?3:-3;  
            if(this.y < 350){
                this.pause = true;
                this.goUp = false;
                setTimeout(function(thisObj){thisObj.pause = false; 
                },800,this);
            }
            if(this.y > 434){
                gameScene.newDucks();
                this.goUp = true;//reset values
            }
            
        }
    };
    this.drawDog = function(count){//put here the number of ducks he catch
        ctx.drawImage(this.theImage,
                        136*((this.ducks==1)?0:1),
                        0, 136,139,this.x,this.y,136,139);
    };
}