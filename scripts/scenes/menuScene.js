function MenuScene(){
    this.sprites = {
        bgColor : new rect("000000",0,0,800,600),//the black background 
        logo : new image("images/duckhuntLogo.png",144,50,512,200),//draw logo
        copy : new text("FFFFFF","Coen Stange & Sebastiaan Hoevers & Jeroen Vervoort & Ramon Schreuders",25,560),//laat onze namen zien
        duck1 : new text("FFFFFF","1 Duck",360,300),
        duck2 : new text("FFFFFF","2 Ducks",360,350),
        highscore : new text("0BDB27","Highscore : 0",190,450),
        made : new text("FFFFFF","Made By", 360,530),
        };
    this.sprites.copy.font = "14pt duck_hunt";
    this.mouseDown = function(x,y){
        if(this.checkButton(this.sprites.duck1,x,y)){//when 1 is clicked
            this.startGame(1);
        }else if(this.checkButton(this.sprites.duck2,x,y)){
            this.startGame(2);
        }
    };
    this.startGame = function(n){
        gameScene.sprites.ducks.create(n);
        gameScene.round = 0;//will become 1 in newRound
        gameScene.newRound();
        gameScene.sprites.dog = new dog();
        gameScene.sceneState = 0;
        gameState = 1;//ga naar gameplay
    }
    this.checkButton = function(text,x,y){
        var w = 200;
        var h = 20;
        if(text.x < x && text.x + w> x && text.y - h< y  && text.y> y){
            return true;
        }
        return false;
    }
    
    this.loop = function(){
        
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