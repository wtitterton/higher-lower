// game logic

  // game object
    //build array of random numbers between 1 and 30;
    //handle player score
    // handle outputting number;
    // handle checking of player guess


    // player will choose from higher or lower
      // we will have a boolean called higher and it will be set to false




// buttons
var guessBtn = document.querySelectorAll('.guess-btn');
var play = document.querySelector('.play');
var replay = document.querySelector('.play-again');
var mainMenu = document.querySelector('.main-menu');
var rules = document.querySelector('.rules');
// elements
var card = document.querySelector('.card');
var score = document.querySelector('.score');
var endScore = document.querySelector('.y-score');
var overlay = document.querySelector('.overlay');
// menus
var gameOverMenu = document.querySelector('.gameOverMenu');
var gameScreen = document.querySelector('.gameScreen');
var startMenu = document.querySelector('.startMenu');

var player =
{
  guess:'',
  score: 0,
  updateScore: function()
  {
    this.score += 1;
    score.classList.add('bounce');
    score.textContent = 'score ' + this.score;
  },
  updatePlayerGuess: function(context)
  {

    if(context.dataset.guess == 'lower')
    {
      this.guess = 'lower';
    }
    else
    {
        this.guess = 'higher'
    }
  }
}

var game =
{
  numbers: [],
  index:0,
  playAgain:false,
  arrayLength:undefined,
  buildArray: function(min,max,length)
  {
    this.arrayLength = length;
    for(var i = 0; i < length; i++ )
    {
      this.numbers.push(Math.floor(Math.random()*(max-min+1)+min));
    }
  },
  outputNumber: function(){
    var num = this.numbers[this.index];
    card.src = 'cards/' + num + '.png';
  },
  updateIndex: function()
  {

    if(this.index == this.arrayLength)
    {
      //you win
      alert('you won');
      game.handleGameScreen('start');
    }
    else
    {
      this.index += 1;
    }
  },

  checkPlayerGuess: function()
  {
    var currNum = this.numbers[this.index];
    var nextNum = this.numbers[this.index + 1];

    if(player.guess == 'higher' && nextNum >= currNum || player.guess == 'lower' && nextNum <= currNum)
    {
      console.log('right');
      player.updateScore();
    }
    else
      {
        console.log('wrong');
        this.handleGameScreen('gameOver');
      }
    },
    handleGameScreen: function(screen)
    {
      switch(screen)
      {
        case 'start':
        startMenu.classList.remove('fadeOutRight');
        startMenu.classList.add('fadeInLeft');
        gameOverMenu.classList.add('fadeOutRight');
        gameScreen.classList.add('fadeOutRight');
        break;
        case 'gameScreen':
          gameScreen.classList.remove('fadeOutRight');
          gameScreen.classList.add('fadeInLeft');
          gameOverMenu.classList.add('fadeOutRight');
          startMenu.classList.add('fadeOutRight');
        break;
        case 'gameOver':
          gameScreen.classList.add('fadeOutRight');
          gameScreen.classList.remove('fadeInLeft');
          gameOverMenu.classList.remove('fadeOutRight');
          gameOverMenu.classList.add('fadeInLeft');

          endScore.textContent = 'Your score ' + player.score;
        break;
      }
    },
    resetClasses:function(){
      var menus = document.querySelectorAll('.menu');
      menus.forEach(function(menu){
        menu.classList.remove('fadeInLeft','fadeOutRight');
      });
    },
    gameInit: function(){


        this.index = 0;
        player.score = 0;
        this.numbers = [];
        score.textContent = 'score';
        game.resetClasses();

      game.buildArray(1,13,52);
      game.outputNumber();
      score.style.opacity = '0';
      this.handleGameScreen('gameScreen');
    }
}







// bind events
var isIn = false;

guessBtn.forEach(function(btn){
  btn.addEventListener('click', function(){
    var context = this;
    player.updatePlayerGuess(context);
    game.checkPlayerGuess();
    game.updateIndex();
    if(isIn)
    {
      card.classList.add('bounceOutRight');
      card.classList.remove('bounceInDown');
    }
    else {

      card.classList.add('bounceInDown');
      card.classList.remove('bounceOutRight');
    }
  });
});

play.addEventListener('click',function(){
  game.gameInit();
});

mainMenu.addEventListener('click',function(){
  game.handleGameScreen('start');
});

replay.addEventListener('click',function(){
  game.playAgain = true;
  game.gameInit();
});

rules.addEventListener('click',function(){
  overlay.classList.toggle('active');
});
overlay.addEventListener('click',function(){
  overlay.classList.toggle('active');

});
  var hand = document.querySelector('.hand');
window.onload = function(){

    setTimeout(function(){
      hand.classList.add('spread');
    },500);
}

var handCards = hand.querySelectorAll('.card');


hand.addEventListener('transitionend',function(e){
  this.classList.add('pushUp');
});







/********************************************************
                        animation end events
*********************************************************/
/*startMenu.addEventListener('animationend',function(){
  game.handleGameScreen('gameScreen');
});

gameScreen.addEventListener('animationend',function(){
  gameScreen.classList.remove('fadeInLeft');
});

gameOverMenu.addEventListener('animationend',function(){
  gameScreen.classList.add('fadeInLeft');
}); */

score.addEventListener('animationend',function(e){
  score.classList.remove('bounce');
  score.style.opacity = '1';
});

card.addEventListener('animationend',function(e){
  var target = e.target || e.srcElement;
  if(target.classList.contains('bounceOutRight'))
  {
    isIn = false;
    card.classList.remove('bounceOutRight');
    card.classList.add('bounceInDown');
    game.outputNumber();
  }
  else {
    isIn = true;
    card.classList.remove('bounceInDown');
  }
});
