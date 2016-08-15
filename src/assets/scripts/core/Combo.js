var Q = require('../libs/kew'),
	Signal = require('../libs/signals');

var counter = 0;

module.exports = function(moves, showDelay, hideDelay) {

	var STATE_TOO_SOON = 0,
		STATE_ON_TIME = 1;

	var id = counter++;

	var _deferred,
		_moves = moves,
		_currentMove,
		_isOnTime = new Signal(),
		_currentState = STATE_TOO_SOON,
		_showDelay = showDelay || 0,
		_hideDelay = hideDelay || 0,
		_showTimer,
		_hideTimer;

	console.log('id', id, 'moves', moves, 'showDelay', showDelay, 'hideDelay', hideDelay);


	function start() {

		_deferred = Q.defer();
		nextMove();

		return _deferred.promise;
	}

	function onShowDelayFinished() {

		if(hideDelay >= 0) {

			_hideTimer = startTimer(_hideDelay, onTime);

		} else {

			onTime();
		}
	}

	function onTime() {

		_currentState = STATE_ON_TIME;

		console.log('onTime', _currentMove, id);
		_isOnTime.dispatch(_currentMove);
	}

	function nextMove() {

		_currentMove = _moves.shift();

		if(!_currentMove) {

			_deferred.resolve('success!');

		} else {

			_showTimer = startTimer(_showDelay, onShowDelayFinished);
		}
	}

	function executeMove(firedMove) {

		killTimer();

		if(_currentState === STATE_TOO_SOON) {

			console.log('too soon', id);

		} else if(firedMove !== _currentMove) {

			console.log('wrong move', id);
			// _deferred.reject('wrong move!');

		} else {

			nextMove();
		}
	}

	function destroy() {

		_isOnTime.removeAll();
		_isOnTime = null;
		killTimer();
	}

	function killTimer() {

		clearTimeout(_showTimer);
		clearTimeout(_hideTimer);
	}

	function startTimer(delay, callback) {

		return setTimeout(callback, delay);
	}

	this.isOnTime = _isOnTime;
	this.executeMove = executeMove;
	this.start = start;
	this.destroy = destroy;
	this.getId = function() {
		return id;
	}
};