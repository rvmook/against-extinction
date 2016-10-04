var Signal = require('../libs/signals'),
	constants = require('../core/constants');

module.exports = function(){

	var _moveFired = new Signal();

	function init() {

		window.addEventListener('keyup', onKeyUp);
	}

	function onKeyUp(e) {

		var move;

		switch(e.keyCode) {

			case 13: move = constants.MOVE_ENTER; break;

			case 38: move = constants.MOVE_UP; break;
			case 40: move = constants.MOVE_DOWN; break;
			case 37: move = constants.MOVE_LEFT; break;
			case 39: move = constants.MOVE_RIGHT; break;
		}

		if(move) {

			_moveFired.dispatch(move);
		}
	}

	function destroy() {

		_moveFired.removeAll();
		_moveFired = null;
		window.removeEventListener('keydown', onKeyUp);
	}

	this.init = init;
	this.moveFired = _moveFired;
	this.destroy = destroy;
	this.isOnTime = function(){};
};