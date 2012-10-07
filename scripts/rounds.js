var rounds = {
    firstRounds : [
    {maxTime:10000,minDucks:5},//1
    {maxTime:9000,minDucks:5},//2
    {maxTime:8000,minDucks:6},//3
    {maxTime:7000,minDucks:6},//4
    {maxTime:6000,minDucks:7},//5
    {maxTime:6000,minDucks:7},//6
    {maxTime:6000,minDucks:8},//7
    {maxTime:5000,minDucks:8},//8
    {maxTime:5000,minDucks:9},//9
    {maxTime:5000,minDucks:9}//10
    ],
    getMaxTime:function(n){
        if(n < this.firstRounds.length){
            return this.firstRounds[n].maxTime;
        }else{
            return 5000;    
        }
    },
    getDuckSpeed:function(n){
        return 4+n*0.2;           
    },
    getMinDucks:function(n){
     if(n < this.firstRounds.length){
            return this.firstRounds[n].minDucks;
        }else{
            return 9;    
        }        
    }   
};