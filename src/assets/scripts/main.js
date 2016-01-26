var actionHandler = require('./core/actionHandler'),
	constants = require('./core/constants'),
	Player = require('./core/Player');


var humanPlayer = new Player();
var aiPlayer = new Player();

actionHandler.init();

humanPlayer.init(5, 1000, false);
aiPlayer.init(5, 1500, true, 0.1);

humanPlayer.start()
	.then(function(){
		gameOver(true);
	}).fail(onError);
aiPlayer.start()
	.then(function(){

		gameOver(false);
	}).fail(onError);


function onError(e) {
	console.error(e);
}

function gameOver(playerWon) {

	humanPlayer.destroy();
	aiPlayer.destroy();

	if(playerWon) {

		console.log('You won!');
	} else {

		console.log('You lost...');
	}
}