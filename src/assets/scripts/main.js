var actionHandler = require('./core/actionHandler'),
	signalBus = require('./core/signalBus'),
	writeInDiv = require('./utils/writeInDiv'),
	constants = require('./core/constants'),
	Player = require('./core/Player');


var humanPlayer = new Player(),
	aiPlayer = new Player(),
	isPlaying = false;

writeInDiv('general', 'Press `ENTER` to start');
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

	writeInDiv('general', '');

	isPlaying = true;
	humanPlayer.init('player', 5, 1000, false);
	aiPlayer.init('ai', 5, 2000, true, 0.1);

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

	writeInDiv('player', '');
	writeInDiv('ai', '');
	if(playerWon) {

		writeInDiv('general', 'You won!<br>Press `ENTER` to replay');

	} else {

		writeInDiv('general', 'You lost...<br>Press `ENTER` to replay');
	}

	stop();
}

function stop() {

	isPlaying = false;

	humanPlayer.destroy();
	aiPlayer.destroy();
}