var Signal = require('../libs/signals');

module.exports = function(moves) {

	var _finished = new Signal(),
		_updated = new Signal(),
		_wrong = new Signal(),
		_currentIndex = 0,
		_currentMove,
		_moves = moves;


	function start() {

		console.log(moves);

		_currentIndex = 0;
		nextMove();
	}

	function nextMove() {

		_currentMove = _moves[_currentIndex];
		_currentIndex++;

		_updated.dispatch();

		if(!_currentMove) {

			_finished.dispatch();
		}
	}

	function executeMove(firedMove) {

		if(firedMove !== _currentMove) {

			_wrong.dispatch();

		} else {

			nextMove();
		}
	}

	function destroy() {

		_updated.removeAll();
		_finished.removeAll();
		_wrong.removeAll();
	}

	this.executeMove = executeMove;
	this.start = start;
	this.destroy = destroy;

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