var Player = function(){
	
	var higher = false;
	this.score = 0;
}

Player.prototype.updatePlayerChoice = function(elemClick)
{
		// get button pressed then update higher variable acordingly
		//eg if elem clicked is lower set higher to false;
		var guess = elemClick.dataset.guess;

		if(guess == 'higher')
		{
			higher = true;
		}
		else
		{
			higher = false;
		}
}

Player.prototype.getPlayerChoice = function()
{
	return higher;
}

Player.prototype.updatePlayerScore = function()
{
	this.score += 1;
}

Player.prototype.showPlayerScore = function()
{
	var scoreElement = document.querySelector('.score');
	if(scoreElement)
	{
		document.body.removeChild(scoreElement);
	}
	
	var scoreElem = document.createElement('h1');
	scoreElem.classList.add('animated', 'pulse', 'score');
	document.body.appendChild(scoreElem);
	scoreElem.textContent = 'Score ' + this.score;
}

Player.prototype.hidePlayerScore = function(scoreElem)
{
	scoreElem.style.display = 'none';
}
