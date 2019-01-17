var UI = function()
{
	
}
// pass shuffled deck to the UI
UI.prototype.buildHomeScreenCards = function(deck)
{
	var cardHolder = document.querySelector('.cardHolder');
	for(var i = 1; i < 30; i++)
	{
		var img = document.createElement('img');
		img.classList.add('card');
		
		if(i == 15)
		{
			// set middle card src to that of the src of first card in deck
			img.src = deck[0].src;
			img.classList.add('middleCard','card');
		}
		else if(i < 15)
		{
			
			img.src = deck[i].src;
			
		}
		else
		{
			img.src = deck[i].src;
			
		}
		
		cardHolder.appendChild(img);
	}



	
	
}

UI.prototype.buildStartMenu = function(deck)
{
	var cardCon = document.querySelector('.cardHolder');
	var deck = deck.getDeck();
	this.buildHomeScreenCards(deck);

	// build game btns here
	var btnContainer = document.createElement('div');
	btnContainer.classList.add('btns-con');
	var play = document.createElement('h6');
	play.textContent = 'Play';
	play.classList.add('play', 'btn');
	btnContainer.appendChild(play);
	
	var rules = document.createElement('h6');
	rules.classList.add('rules', 'btn');
	rules.textContent = 'Rules';
	//append to container then document
	btnContainer.appendChild(rules);
	cardCon.parentNode.insertBefore(btnContainer,cardCon.nextSibling);

	setTimeout(function(){
		cardCon.classList.add('anim');
	},500);



	
}



UI.prototype.buildGameScreen = function()
{
	
	var allCards = document.querySelectorAll('.card:not(.middleCard)');
	var btnCon = document.querySelector('.btns-con');
	// remove images on transition end
	allCards[allCards.length -1].addEventListener('transitionend',function(){
		var allCards = document.querySelectorAll('.card:not(.middleCard)');
		
		allCards.forEach(function(card){
			card.parentNode.removeChild(card);
		});
		btnCon.classList.add('bounceOutRight');
	});



}

UI.prototype.bindGameEvents = function(player,deck)
{
  
	var guessBtn = document.querySelectorAll('.guess-btn');

	guessBtn.forEach(function(curr){
		curr.addEventListener('click',function(event){
			var x = event.target||event.srcElement;
      		player.updatePlayerChoice(x);
			var choice = player.getPlayerChoice();
			deck.compareCards(choice);
		});
	});
              
}

UI.prototype.buildGameControls = function()
{
	var gameControls = document.createElement('div');
	var cardHolder = document.querySelector('.cardHolder');
	gameControls.classList.add('gameControls');
	var html = '';
	html += '<div class="guess-btn" >';
	html += '<img data-guess="lower" src="imgs/chipFinalDown.png">'; 
	html += '</div>'; //end btn container

	html += '<div class="validate-btn">';
	html += '<i class="fa fa-question-circle"></i>';
	html += '</div>';

	html += '<div class="guess-btn" >';
	html += '<img data-guess="higher" src="imgs/chipFinalUP.png">';
	html += '</div>'; //end btn container
	
	cardHolder.appendChild(gameControls);
	cardHolder.classList.add('animated', 'fadeInUp');
	gameControls.innerHTML = html;

}

UI.prototype.activeControls = function(gameOver)
{
	var chips = document.querySelectorAll('.guess-btn');
	var validateBtn = document.querySelector('.validate-btn');
	
	
	chips[0].classList.add('show');
	chips[1].classList.add('show');
	validateBtn.classList.add('small');
	validateBtn.innerHTML = '';
	validateBtn.innerHTML = '<i class="fa fa-question-circle" aria-hidden="true"></i>';
}

UI.prototype.inActiveControls = function()
{
	var chips = document.querySelectorAll('.guess-btn');
	var validateBtn = document.querySelector('.validate-btn');
	validateBtn.innerHTML = '';
	validateBtn.innerHTML = '<i class="fa fa-question-circle" aria-hidden="true"></i>';
	chips[0].classList.remove('show');
	chips[1].classList.remove('show');
	validateBtn.classList.remove('small');

}

UI.prototype.updateValidateBtn = function(result)
{	
	var valBtnIcon = document.querySelector('.validate-btn');
	valBtnIcon.innerHTML = '';
	
	if(result.toLowerCase() == 'wrong')
	{
		
		valBtnIcon.innerHTML = '<i class="fa fa-times animated fadeIn" aria-hidden="true"></i>';
	}
	else
	{
		valBtnIcon.innerHTML = '<i class="fa fa-check animated fadeIn"></i>';
	}
}

 UI.prototype.setupAnimationEvent = function()
 {

   
    var transitions = {
        'animation':'animationend',
        'OAnimation':'oAnimationEnd',
        'MSAnimation':'MSAnimationEnd',
        'WebkitAnimation':'webkitAnimationEnd'
    };

    for(var t in transitions){
        if( transitions.hasOwnProperty(t)){
            return transitions[t];
        }
    }
}

 UI.prototype.setupTransitionEvent = function(){
    var t;
    
    var transitions = {
      'transition':'transitionend',
      'OTransition':'oTransitionEnd',
      'MozTransition':'transitionend',
      'WebkitTransition':'webkitTransitionEnd'
    }

    for(t in transitions){
       return transitions[t];
       
    }
}



UI.prototype.buildRulesScreen = function()
{
	var overlay = document.createElement('div');
	var content = document.createElement('div');
	overlay.appendChild(content);
	overlay.classList.add('overlay','animated', 'slideInDown');

	var html = '';

	html += '<h2>Rules</h2>';
	html += '<p>The card game  Higher or Lower centers itself on probability, guesswork, and a little bit of luck. HiLo requires a simple setup to play coupled with an equally simple objective: two players compete to correctly guess whether the value of a card is higher or lower than the previous card. If you make enough correct consecutive guesses, you win the game. </p>';
	html += '<h2>Gameplay</h2>'
	html += '<p>Card value starts with aces considered the lowest (value of 1) and kings being considered the highest (value of 13). The two players take turns guessing whether the next face-down card in their line-up will be of lower or higher value than the previous card before flipping the card face up. If a guess is incorrect, the player must remove all face-up cards from their lineup to a discard pile, replace each card with a new face-down card from the deck, and then start over. The first player to flip all of their cards wins the game.</p>'
		html += '<img class="close" src="imgs/rightArrow.png">'
	content.innerHTML = html;
	document.body.appendChild(overlay);

	var closeBtn = document.querySelector('.close');

	closeBtn.addEventListener('click', function(){
		overlay.classList.add('slideOutRight');
		overlay.addEventListener(UI.setupAnimationEvent.call(UI),function(event){
			if(event.animationName === 'slideOutRight');
			{	
				document.body.removeChild(overlay);
			}
		});
	});

	
}

UI.prototype.gameOverMenu = function(card,highOrLow,score, callback)
{


	var cardHolder = document.querySelector('.cardHolder');
	
	cardHolder.classList.remove('bounceInDown');
	var chips = document.querySelector('.guess-btn');
	cardHolder.classList.add('animated','zoomOut');
	var gameOverScreenCardSrc = card.src;
	cardHolder.addEventListener(this.setupAnimationEvent(),function(){
	document.body.innerHTML = '';
	var gameOverScreen = document.createElement('div');
	var card = document.createElement('img');
	card.src = gameOverScreenCardSrc;
	var gameInfo = document.createElement('div');
	
	var html = '';
	html += '<h4> sorry the card was ' + '<span class="indicator">' + highOrLow + '</span>'  + '</h4>';
		
		// variants of score output(dependent on score)
		if(score == 1)
		{
			html += '<p> Bad Luck, you scored ' + score + ' point' + '</p>';
		}
		else if(score > 1 && score < 4 || score == 0)
		{
			html += '<p> Bad Luck, you scored ' + score + ' points' + '</p>';
		}
		else
		{
			html += '<p> Well done, you scored ' + score + ' points!' + '</p>';
		}

		html += '<h6 class="btn playAgain">Play Again </h6>';

		gameInfo.innerHTML = html;

		
		gameOverScreen.appendChild(card);
		gameOverScreen.appendChild(gameInfo);
		gameOverScreen.classList.add('gameOverScreen');


		document.body.appendChild(gameOverScreen);
		gameOverScreen.classList.add('animated','zoomIn');

		var playAgain = document.querySelector('.playAgain');
		playAgain.addEventListener('click',function(){
			// what we need to to reset game.
				// reshuffle cards
				// set deck index to 0;
				window.App.playAgain();
			});

	});

}






