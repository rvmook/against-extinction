var constants = require('./constants'),
	signalBus = require('./signalBus');

function init() {

	window.addEventListener('keydown', onKeyDown);
}

function onKeyDown(e) {

	var move;

	switch(e.keyCode) {

		case 13: move = constants.MOVE_ENTER; break;

		case 38: move = constants.MOVE_UP; break;
		case 40: move = constants.MOVE_DOWN; break;
		case 37: move = constants.MOVE_LEFT; break;
		case 39: move = constants.MOVE_RIGHT; break;
	}

	signalBus.MOVE_FIRED.dispatch(move);
}

exports.init = init;