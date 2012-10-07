function GameScene(){
    this.sprites = {
        /************************
        * put here all the sprites of the scene
        * dont matter what object you put in herea, it needs the function draw()
        * put it in right order
        *************************/
        bgColor : new rect("42b9fd",0,0,800,600),//the cyan background
        tree : new image("images/tree.png",5,210,173,260),//the tree isn't part of background
        catchingDog : new catchingDog(),
        ducks : new ducks(),//this will cotain more ducks    
        bg : new image("images/back.png",0,395,800,115),//the background is especialy the grass
        scoreBg : new rect("cb6a00",0,510,800,90),//the score image doesn't have bg color
        score : new image("images/score.png",150,530,500,50),//the scoreboard
        scoreBoard : new scoreBoard(),//special sprite that will show the score,number of lives and thumber of bullets
        dog : new dog()//also special sprite    
        //beware the last object don't need a comma at the end!
        };
    
    this.sceneState = 0;//intro walking dog
    /***scene states******
     * 0:intro
     * 1:gameplay
     * 2:catching
     * 3:round done and moving score ducks to left
     ********************/
    this.duckCount = 0;
    this.deadDucks = 0;
    this.roundDeadDucks = 0;
    this.currentDuck = 0;
    this.waitForDucksHitTheGround = false;
    this.maxShootTime = 10000;
    this.timer;
    this.round = 1;
    
    this.newRound = function(){
        this.round++;
        this.sprites.scoreBoard.sprites.round.string = "R"+this.round;
        this.duckCount = 0;
        this.deadDucks = 0;
        this.roundDeadDucks = 0;
        this.currentDuck = 0;
        this.waitForDucksHitTheGround = false;
        this.sprites.scoreBoard.create(6);
        this.sprites.ducks.create(this.sprites.ducks.theDucks.length);//create new ducks
         
        this.sceneState = 0;
        
    };
    this.setShootTimer = function(){
        clearTimeout(this.timer);
        this.timer = setTimeout(function(thisObj){thisObj.notAllShot();  
            },this.maxShootTime,this);
    };
    this.mouseDown = function(x,y){
        if(this.sceneState == 1){
            this.sprites.scoreBoard.popBullet();
            //loop trough ducks
            for(var i = 0;i < this.sprites.ducks.theDucks.length;i++){
                if(this.checkDuck(this.sprites.ducks.theDucks[i],x,y)){
                    this.sprites.ducks.theDucks[i].duckDead = true;//change duckState
                    this.deadDucks++;//another duck dead
                    this.roundDeadDucks++;
                    
                    this.sprites.scoreBoard.addScore(500);
                    
                    this.sprites.scoreBoard.scoreDucks[this.currentDuck] = true;//change scoreboard to add a duck
                    this.currentDuck ++;
                    
                    if(this.deadDucks == this.duckCount){
                        this.sprites.catchingDog.x = this.sprites.ducks.theDucks[i].x;//Change position of dog
                        this.sprites.catchingDog.ducks = this.duckCount;
                        this.waitForDucksHitTheGround = true;
                        return;
                    }                
                }
            }
            if(this.sprites.scoreBoard.gameBullets == 0){
                this.notAllShot();
            }
        }
    };
    this.notAllShot = function(){//when subround is over but not all ducks are shot
        if(this.sceneState==1){
            this.currentDuck += this.duckCount - this.deadDucks;
            this.sprites.catchingDog.x = 400;//Change position of dog
            this.sprites.catchingDog.ducks = this.deadDucks;
            this.waitForDucksHitTheGround = true;
            this.sprites.ducks.letFly();
        }
    };
    
    this.checkDuck = function(duck,x,y){//check if shot on duck
        if(duck.duckDead){
            return false;    
        }
        var w = 75;
        var h = 74;
        if(duck.x < x && duck.x + w > x  && duck.y < y && duck.y + h> y){
            return true;
        }
        return false;
    };
    
    this.newDucks = function(){//when dog have caught the ducks    
        this.sprites.scoreBoard.resetBullets();
        this.sprites.ducks.init();
        this.deadDucks = 0;
        this.sceneState = 1;
        
        this.setShootTimer(); 
        
        this.checkRound();
    };
    this.checkRound = function(){//check if round is over
        if(this.currentDuck >= 10){
            this.sceneState = 3;
        }
    };
    this.roundTransition = {
        parent:this,
        //this.parent.deadDucks
        loop:function(){
          if(frameCounter.frame %  20== 0){//dont do evry frame but every 5 frames
                var duckScore = this.parent.sprites.scoreBoard.scoreDucks;
                //check if scoreboard is right
               var done = true;
               for(var i = 0;i<this.parent.roundDeadDucks;i++){
                    if(!duckScore[i]){
                        done = false;    
                    }
               }
               if(done){
                    if(this.parent.sprites.scoreBoard.minDucks>this.parent.roundDeadDucks){
                        alert("You lose!");
                        gameState = 0;
                    }else{
                        this.parent.newRound();
                    }
                }          
                //move the duckScore
                for(var i = 1; i <10;i++){
                    if(duckScore[i]&&!duckScore[i-1]){//if current duck is true and previous not swap those
                        duckScore[i] = false;
                        duckScore[i-1] = true;
                        break;
                    }
                }               
            }
        }
    };
    this.loop = function(){
        this.sprites.ducks.loop();//ducks need to move
        this.sprites.dog.loop();//dog has animation
        this.sprites.catchingDog.loop();//let the catching dog animate to
        if(this.waitForDucksHitTheGround){
            this.checkForDucksHitTheGround();    
        }
        if(this.sceneState==3){
            this.roundTransition.loop();    
        }
    };
    this.checkForDucksHitTheGround = function(){
        var notOutOfScreen = false;
        for(var i = 0;i < this.sprites.ducks.theDucks.length;i++){
            if(this.sprites.ducks.theDucks[i].duckDead&&this.sprites.ducks.theDucks[i].y<450){//if a duck is dead and not out of window 
                notOutOfScreen = true;
            }
        }
        if(!notOutOfScreen){
            this.waitForDucksHitTheGround = false;
            this.sceneState = 2;//let the dog catch it
        }
    };
    
    this.draw = function(){
        /***********
         * loop trough all sprites and draw it on canvas
         ***********/        
        for(var thisSprite in this.sprites){
            this.sprites[thisSprite].draw();       
        } 
    };
}