var Deck = function(player,ui){
	this.cards = [];
	this.index = 0;
	this.player = player;
	this.ui = ui;
}

Deck.prototype.buildDeck = function()
{
	var count = 0;
		var suit = ['c','d','h','s'];
		var suitIndex = 0;
		var cardNum = 0;
		for(var i = 0; i < 52; i++)
		{	
			count++;
			var cSrc = 'cards/' + suit[suitIndex] + count + '.png';
			this.cards.push({
				value:count,
				src: cSrc
			});

			if(count == 13)
			{	
				suitIndex++;
				count = 0;
			}
		}
}

Deck.prototype.compareCards = function(higher)
{
	var cardA = this.cards[this.index];
	var cardB = this.cards[this.index + 1];
	var HighOrLow = undefined;
	if(cardB.value > cardA.value)
	{
		HighOrLow = 'higher';
	}
	else
	{
		HighOrLow = 'lower';
	}
	if(higher == true && cardA.value <= cardB.value || higher == false && cardA.value >= cardB.value )
	{	
		// right
		this.getNextCard(this.animateCard);
		this.player.updatePlayerScore();
		this.player.showPlayerScore();
		
	}
	else
	{	
		//wrong
		this.ui.inActiveControls();
		this.ui.updateValidateBtn('wrong');
		var chips = document.querySelector('.guess-btn');
		var that = this;
		chips.addEventListener(this.ui.setupTransitionEvent(),function()
		{
			that.ui.gameOverMenu(cardB,HighOrLow,that.player.score);
		});
	}

			
}

Deck.prototype.showFirstCard = function(img)
{
	var src = cards[0].src;
	console.log(src);
	img.src = src;
}

Deck.prototype.getNextCard = function(callback)
{
	var that = this;
	var img = document.querySelector('.middleCard');
	callback(img);
	setTimeout(function(){
		
		var img = document.querySelector('.middleCard');
		that.index++;
		img.src = that.cards[that.index].src;
		
	},500);
	

}
// handle animation of card
Deck.prototype.animateCard = function(img)
{
	img.classList.add('animated', 'bounceOutDown');
	UI.inActiveControls();
	UI.updateValidateBtn('right');
	img.addEventListener(this.UI.setupAnimationEvent(), function(){
		img.classList.remove('bounceOutDown');
		img.classList.add('bounceInDown');
		UI.activeControls();
	});
}



Deck.prototype.shuffleCards = function()
{
		 var currentIndex = this.cards.length, temporaryValue, randomIndex;
		// While there remain elements to shuffle...
		  while (0 !== currentIndex) {

		    // Pick a remaining element...
		    randomIndex = Math.floor(Math.random() * currentIndex);
		    currentIndex -= 1;

		    // And swap it with the current element.
		    temporaryValue = this.cards[currentIndex];
		    this.cards[currentIndex] = this.cards[randomIndex];
		    this.cards[randomIndex] = temporaryValue;
		  }

		  /*console.log(this.cards);*/
}

Deck.prototype.getDeck = function()
{
	return this.cards;
}


