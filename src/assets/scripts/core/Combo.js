var Q = require('../utils/kew'),
	constants = require('./constants'),
	Signal = require('../utils/signals');

module.exports = function(size, delay) {

	var STATE_TOO_SOON = 0,
		STATE_ON_TIME = 1,
		COMBO_SIZE = size;

	var _timer,
		_deferred,
		_moves,
		_currentMove,
		_moveUpdated = new Signal(),
		_currentState = STATE_TOO_SOON,
		_delay = delay;


	init();

	function init() {

		_moves = createMoves();
		nextMove();
	}

	function createMoves() {

		var i = 0,
			moves = [],
			move;

		for(i; i < COMBO_SIZE; i++) {

			move = createRandomMove();

			moves.push(move);
		}

		return moves;
	}

	function createRandomMove() {

		var randomMove = sample(constants.ALL_MOVES);

		return randomMove;
	}


	function execute() {

		_deferred = Q.defer();

		startTimer(_delay, onDelayFinished);

		return _deferred.promise;
	}

	function onDelayFinished() {

		_currentState = STATE_ON_TIME;

		_moveUpdated.dispatch(_currentMove);
	}

	function nextMove() {

		_currentMove = _moves.shift();

		if(!_currentMove) {

			_deferred.resolve('success!');
		}
	}

	function fireMove(firedMove) {

		killTimer();

		if(_currentState === STATE_TOO_SOON) {

			_deferred.reject('too soon!');

		} else if(firedMove !== _currentMove) {

			_deferred.reject('wrong move!');

		} else {

			console.log('next move');

			nextMove();
		}
	}

	function destroy() {

		killTimer();
	}

	function killTimer() {

		clearTimeout(_timer);
	}

	function startTimer(delay, callback) {

		_timer = setTimeout(callback, delay);
	}

	this.moveUpdated = _moveUpdated;
	this.fireMove = fireMove;
	this.execute = execute;
	this.destroy = destroy;
};