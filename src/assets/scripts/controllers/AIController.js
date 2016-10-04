var Signal = require('../libs/signals');

module.exports = function(_delay){

	var _moveFired = new Signal(),
		_aiTimeout,
		_currentCombo;

	function init() {

	}

	function destroy() {

		clearTimeout(_aiTimeout);
		_moveFired.removeAll();
	}

	this.init = init;
	this.moveFired = _moveFired;
	this.destroy = destroy;
	this.isOnTime = function(combo){

		_currentCombo = combo;
		_aiTimeout = setTimeout(fireCurrentMove, _delay);
	};

	function fireCurrentMove(){

		var currentMove = _currentCombo.getCurrentMove();

		if(currentMove) {

			_moveFired.dispatch(_currentCombo.getCurrentMove().action);
			_aiTimeout = setTimeout(fireCurrentMove, _delay);
		}
	}
};