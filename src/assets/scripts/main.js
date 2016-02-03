var keyHandler = require('./core/keyHandler'),
	signalBus = require('./core/signalBus'),
	writeInDiv = require('./utils/writeInDiv'),
	constants = require('./core/constants'),
	Player = require('./core/Player');


var humanPlayer = new Player(),
	aiPlayer = new Player(),
	isPlaying = false,
	datGuiProps = new function() {

		this.moves = 5;
		this.aiDelay = 2000;
		this.aiMissChance = 0;

		this.start = start;
		this.stop = stop;
	}();

var gui = new dat.GUI();
gui.add(datGuiProps, 'moves', 0, 10).step(1);
gui.add(datGuiProps, 'aiDelay', 0, 5000).step(100);
gui.add(datGuiProps, 'aiMissChance', 0, 1).step(0.05);
gui.add(datGuiProps, 'start');
gui.add(datGuiProps, 'stop');

writeInDiv('general', 'Press `ENTER` to start');
keyHandler.init();

signalBus.MOVE_FIRED.add(onMoveFired);

function onMoveFired(move) {

	if(move === constants.MOVE_ENTER) {

		if(!isPlaying) {

			start();

		} else {

			stop();
		}
	}
}

function start() {

	if(isPlaying) {

		stop();
	}

	writeInDiv('general', '');

	isPlaying = true;
	humanPlayer.init('player', datGuiProps.moves, 0, false);
	aiPlayer.init('ai', datGuiProps.moves, datGuiProps.aiDelay, true, datGuiProps.aiMissChance);

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