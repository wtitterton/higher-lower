

var Game = function(){

	
	//high level stuff. eg pause game, startgame calc score

}
// pass ui to 
Game.prototype.gameInit = function(deck,ui)
{
	//initialize UI, build deck, shuffle deck. show first card
	// build game screen
	deck.buildDeck();
	deck.shuffleCards();
	
	// pass deck to start menu function so we can build random cards on fromt screen
	ui.buildStartMenu(deck);

	return true;
}

Game.prototype.newGame = function()
{
	this.deck.shuffleCards();
}

Game.prototype.pause = function()
{

}

Game.prototype.restart = function()
{

}

Game.prototype.quit = function()
{
	
}












