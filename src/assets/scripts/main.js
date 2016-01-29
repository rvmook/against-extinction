var actionHandler = require('./core/actionHandler'),
	signalBus = require('./core/signalBus'),
	constants = require('./core/constants'),
	Player = require('./core/Player');


var humanPlayer = new Player(),
	aiPlayer = new Player(),
	isPlaying = false;

actionHandler.init();

signalBus.ACTION_FIRED.add(onActionFired);

function onActionFired(action) {

	if(action === constants.ACTION_ENTER) {

		if(!isPlaying) {

			start();

		} else {

			stop();
		}
	}
}

function start() {

	console.log('start');
	isPlaying = true;
	humanPlayer.init(5, 1000, false);
	aiPlayer.init(5, 2000, true, 0.1);

	humanPlayer.start()
		.then(function(){
			gameOver(true);
		}).fail(onError);
	aiPlayer.start()
		.then(function(){

			gameOver(false);
		}).fail(onError);
}




function onError(e) {
	console.error(e);
}

function gameOver(playerWon) {

	if(playerWon) {

		console.log('You won!');
	} else {

		console.log('You lost...');
	}

	stop();
}

function stop() {

	console.log('stop');
	isPlaying = false;

	humanPlayer.destroy();
	aiPlayer.destroy();
}