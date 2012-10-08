var highScore = {
    getHighScore : function(){
        if(typeof(Storage)=="undefined")//check if localStorage works
        {
            console.log("Local storage don't work!");
            return 0;
        }
        if (localStorage.highScore)//check if there is highScore
        {  
            return localStorage.highScore;
        }else{
            localStorage.highScore = 0;
            return 0;
        }

    },
    setHighScore : function(n){
        if(typeof(Storage)=="undefined")//check if localStorage works
        {
            console.log("Local storage don't work!");
            return false;
        }
        if(localStorage.highScore < n){
            localStorage.highScore = n;
        }
        return true;
    }
};