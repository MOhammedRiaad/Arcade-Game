// Enemies our player must avoid
let st = true;
let LifeDiv = document.querySelector('.life');
let winDiv = document.querySelector('.Wins');
LifeDiv.innerHTML = 'You have ( 5 ) Lives ' ;
winDiv.innerHTML = 'You Won ( 0 ) Times ';

 
var getRandomPosition = function() {
    var number = Math.floor((Math.random() * 3) + 1);
    return number;
};

class Enemy {
    constructor() {
    // Variables applied to each of our instances go here,
    
    // we've provided one for you to get started
    this.x= 0;
    this.y=((getRandomPosition())*60);

    this.speed= ((getRandomPosition())*70);

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';   
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks    
update(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if(this.x >= 505)
    {
        this.x = 0;
        this.y = (getRandomPosition())*70;
    }
    this.x += this.speed * dt;
}


// Draw the enemy on the screen, required method for game
render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}
}
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {

    constructor(){
        this.sprite='images/char-boy.png';
        this.x = 200;
        this.y = 410;
        this.speed =70;
        this.win = 0;
        this.game = true ;
        this.life = 5 ;
        this.gemsCollected = 0;
    }
    update(dt){
        this.checkGameWin();
        this.checkBroder();
        this.checkCollisions();
        
        this.checkGameOver();
               
    }
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
    checkGameOver(){
        if (this.life == 0)
        {
            alert('Game Over!!!');
            this.game = false;
            this.gameReset();
            resetTimer();
        }
    }
    checkGameWin(){
        if (this.y <=5)
        {
         this.winGame();
        }
    }

    gameReset(){
        this.life = 5;
        this.win = 0;
        this.game = true;
        this.reset();
        resetTimer();
        
    }
    winGame(){
        this.win +=1 ;
        winDiv.innerHTML = `You Won ( ${this.win} ) Times  ` ;
        LifeDiv.innerHTML = `You have ( ${this.life} ) Lives `;
        alert('YOU WIN');
        this.reset();
        switch (this.win) {
            case 5:
            allEnemies.push(new Enemy());
            break;
            case 10:
            allEnemies.push(new Enemy());
            break;
            case 15:
            allEnemies.push(new Enemy());
            allEnemies.push(new Enemy());
            break;
            case 20:
            allEnemies.push(new Enemy());
            allEnemies.push(new Enemy());
            allEnemies.push(new Enemy());
            break;
			
		}
    }
    loseGame(){
        this.win -= 1;
        this.life -= 1;
        LifeDiv.innerHTML = `You have ( ${this.life} ) Lives ` ;
        winDiv.innerHTML = `You Won ( ${this.win} ) Times  `;
    }
    


    handleInput(action_p){
        
        if(st==true){
            startTimer();
            st=false;
        }
         

        if(action_p == 'left')
        {
            this.x -= this.speed;
        }
        if(action_p == 'right')
        {
            this.x += this.speed;
        }

        if(action_p == 'up')
        {
            this.y -= this.speed;
        }
        if(action_p == 'down')
        {
            this.y += this.speed;
        }


    }
    checkBroder(){
        if (this.x <= 10 || this.x >= 450 || this.y <=10 || this.y >=590)
        {
            this.reset();
        }
    }
    reset(){
        this.x = 200;
        this.y = 410;
    }

    

    checkCollisions(){
    var len = 	 allEnemies.length;
    for (var i = 0; i < len; i++) {
        if ((allEnemies[i].x) <= this.x + 30 &&
            (allEnemies[i].x + 30) >= (this.x) &&
            (allEnemies[i].y)<= this.y + 30 &&
            (allEnemies[i].y + 30) >= (this.y)) {
            this.loseGame();
            alert('YOU LOSE');
            this.reset();
         }
    }

}

}


class Gem  {
    constructor() {

        this.sprite = 'images/gem-orange.png';
        this.x = 0;
        this.y = ((getRandomPosition()) * 5);
    }

    update(dt){

    }


    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}
// @description game timer
var second = 0, minute = 0; hour = 0;
var timer = document.querySelector(".timer");
timer.innerHTML = "0 mins 0 secs";
var interval;
function startTimer(){
    interval = setInterval(function(){
        timer.innerHTML = minute+"mins "+second+"secs";
        second++;
        if(second == 60){
            minute++;
            second=0;
        }
        if(minute == 60){
            hour++;
            minute = 0;
        }
    },1000);
}

function resetTimer(){
    second=0;
    minute=0;
    hour=0;
    var timer = document.querySelector(".timer");
    timer.innerHTML = "0 mins 0 secs";
    clearInterval(interval);
    st=true;
}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let gems = new Gem();
let player = new Player();
let allEnemies = [];
for (let i = 0; i < 3; i++) {

    allEnemies[i]= new Enemy() ; 

}


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
