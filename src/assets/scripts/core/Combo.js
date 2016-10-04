var Signal = require('../libs/signals');

module.exports = function(moves) {

	var _finished = new Signal(),
		_updated = new Signal(),
		_started = new Signal(),
		_wrong = new Signal(),
		_currentIndex = 0,
		_currentMove,
		_moves = moves;


	function start() {

		_currentIndex = 0;
		_moves.forEach(function(move){
			move.isExecuted = false;
		});

		_started.dispatch();

		nextMove();
	}

	function nextMove() {

		_currentMove = _moves[_currentIndex];
		_currentIndex++;

		if(!_currentMove) {

			_finished.dispatch();

		} else {

			_updated.dispatch();
		}
	}

	function executeMove(firedMove) {

		if(firedMove !== _currentMove.action) {

			_wrong.dispatch(firedMove);

		} else {

			_currentMove.isExecuted = true;

			nextMove();
		}
	}

	function destroy() {

		_started.removeAll();
		_updated.removeAll();
		_finished.removeAll();
		_wrong.removeAll();
	}

	this.executeMove = executeMove;
	this.start = start;
	this.destroy = destroy;

	this.started = _started;
	this.finished = _finished;
	this.wrong = _wrong;
	this.updated = _updated;
	this.getMoves = function() {

		return _moves.slice(0);
	};

	this.getCurrentMove = function() {

		return _currentMove;
	};
};