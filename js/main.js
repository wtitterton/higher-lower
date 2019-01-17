var Game = new Game();
var Player = new Player();
var UI = new UI();
var Deck = new Deck(Player,UI);


var App = function()
{
	
}

App.prototype.initialize = function()
{
   // bind bindGameEvents to UI object
   var Events = UI.bindGameEvents.bind(UI);
   if(Game.gameInit(Deck,UI))
   {
   		var play = document.querySelector('.play');
   		var rules = document.querySelector('.rules');
   		// if play button exists then home screen is built
   		if(play)
   		{	
   			
   			// bind buildgame screen to UI object/ this is needed to ensure function can be access due to ctx change
   			var build = UI.buildGameScreen.bind(UI);
   			var rulesScreen = UI.buildRulesScreen.bind(UI);
            var btnCon = document.querySelector('.btns-con');
   			var cards = document.querySelectorAll('.card');
            var cardHolder = document.querySelector('.cardHolder');
   			

   			// bind click handler to play btn
   			play.addEventListener('click',function(){
   				build();
               cardHolder.classList.remove('anim');

   				// when home btns have animated then perform below tasks
   				cards[cards.length - 1].addEventListener(UI.setupTransitionEvent(),function(){
   					btnCon.style.display = 'none';
   					UI.buildGameControls();
   					// bind events after contols have been built
   					Events(Player,Deck);
   					var card = document.querySelector('.middleCard');
   					card.classList.remove('card');
   					card.classList.add('inplay');

   					    
      					cardHolder.addEventListener(UI.setupAnimationEvent(),function(event){
      						
                        if(event.animationName == 'fadeInUp')
                        {
                            UI.activeControls();
                        }
                        else
                        {
                           return;
                        }
                       
   					});
					
   				});
   			});
   			// builds rule screen
			   rules.addEventListener('click',rulesScreen);
   		}
   }

   
}

App.prototype.resetVariables = function()
{

}

App.prototype.playAgain = function()
{
	
	document.body.innerHTML = '';
	var cardHolder = document.createElement('div');
	cardHolder.classList.add('cardHolder');
	document.body.appendChild(cardHolder);
	App.initialize();
	Deck.index = 0;
	Player.score = 0;
}

window.App = new App();
App.initialize(); // On Document load


   




