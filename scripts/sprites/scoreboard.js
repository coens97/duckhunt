function scoreBoard(){
    /*** TODO: make the score appear on the scoreboard, the number of lives and the number of dead ducks ***/
    this.scoreDucks = [false,false,false,false,false,false,false,false,false,false]; 
    this.minDucks = 6;
    
    this.score = 0;
    
    this.sprites = {
        score : new text("FFFFFF","0",640,552),
        bullet1 : new image("images/bullet.png", 162,535, 10, 15),
        bullet2 : new image("images/bullet.png", 178,535, 10, 15),
        bullet3 : new image("images/bullet.png", 194,535, 10, 15)
    };
    this.create = function(minD){
        this.scoreDucks = [false,false,false,false,false,false,false,false,false,false]; 
        this.minDucks = minD;
    };
    
    this.addScore = function(n){
        this.score+=n;
        this.sprites.score.string = this.score.toString();
    };
    
    this.sprites.score.font = "16pt duck_hunt";
    this.sprites.score.textAlign = "right";
    
    this.gameBullets = 3;
    
    this.duckLiveImage = new Image();
    this.duckLiveImage.onload = function() {//callback for when image loaded 
        console.log("image duckLives loaded");
    };
    this.duckLiveImage.src = "images/duckLive.png";
    
    this.draw = function(){
        for(var thisSprite in this.sprites){
            this.sprites[thisSprite].draw();       
        }
        this.drawDuckScore();
    };
    
    this.popBullet = function(){
        //Remove bullet by makeing the width of the image 0
        switch(this.gameBullets){
            case 3:
                this.sprites.bullet3.w = 0;
                break;
            case 2:
                this.sprites.bullet2.w = 0;
                break;
            case 1:
                this.sprites.bullet1.w = 0;
                break;
            default:
                break;
        }
        this.gameBullets--;
    };
    this.resetBullets = function(){
        this.gameBullets = 3;
        this.sprites.bullet1.w = 10;
        this.sprites.bullet2.w = 10;
        this.sprites.bullet3.w = 10;
    };
    this.drawDuckScore = function(){
        //first draw duck lives
        for(var i = 0; i<10;i++){
            ctx.drawImage(this.duckLiveImage,this.scoreDucks[i]?20:0,0,20,20,310+18*i,535,20,20);
        }
        //draw minimum duckLives
        for(var i = 0; i < this.minDucks * 3 ; i++){
            var tmpX = 315 + i * 6;//evry duck has 3 lines and the duck are 18px from each other 18 / 3 = 6
            //draw lines
            ctx.lineWidth = 3;
            ctx.strokeStyle = "52c1f8";
            ctx.beginPath();
            ctx.moveTo(tmpX,558);
            ctx.lineTo(tmpX,572);
            ctx.stroke();
        }
    };
}