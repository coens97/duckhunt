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
        ducks : new ducks(2),//this will cotain more ducks    
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
     ********************/
    
    this.duckCount = 2;
    this.deadDucks = 0;
    this.currentDuck = 0;//
    
    this.mouseDown = function(x,y){
        if(this.sceneState == 1){
            this.sprites.scoreBoard.popBullet();
            //loop trough ducks
            for(var i = 0;i < this.sprites.ducks.theDucks.length;i++){
                if(this.checkDuck(this.sprites.ducks.theDucks[i],x,y)){
                    this.sprites.ducks.theDucks[i].duckDead = true;//change duckState
                    this.deadDucks++;//another duck dead
                    
                    this.sprites.scoreBoard.addScore(500);
                    
                    this.sprites.scoreBoard.scoreDucks[this.currentDuck] = true;//change scoreboard to add a duck
                    this.currentDuck ++;
                    
                    if(this.deadDucks == this.duckCount){
                        this.sprites.catchingDog.x = this.sprites.ducks.theDucks[i].x;//Change position of dog
                        this.sprites.catchingDog.ducks = 2;
                        this.sceneState = 2;//let the dog catch it
                        return;
                    }                
                }
            }
            if(this.sprites.scoreBoard.gameBullets == 0){
                this.currentDuck += this.duckCount - this.deadDucks;
                this.sprites.catchingDog.x = 400;//Change position of dog
                this.sprites.catchingDog.ducks = this.deadDucks;
                this.sceneState = 2;//let the dog catch it
            }
        }
    };
    
    this.checkDuck = function(duck,x,y){//check if shot on duck
        if(duck.duckDead){
            return;    
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
    };
    
    this.loop = function(){
        this.sprites.ducks.loop();//ducks need to move
        this.sprites.dog.loop();//dog has animation
        this.sprites.catchingDog.loop();//let the catching dog animate to
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