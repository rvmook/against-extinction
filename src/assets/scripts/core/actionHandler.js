var constants = require('./constants'),
	signalBus = require('./signalBus');

function init() {

	window.addEventListener('keydown', onKeyDown);
}

function onKeyDown(e) {

	var action;

	switch(e.keyCode) {

		case 38: action = constants.ACTION_UP; break;
		case 40: action = constants.ACTION_DOWN; break;
		case 37: action = constants.ACTION_LEFT; break;
		case 39: action = constants.ACTION_RIGHT; break;
	}

	signalBus.ACTION_FIRED.dispatch(action);
}

exports.init = init;