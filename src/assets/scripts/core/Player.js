var Q = require('../utils/kew'),
	writeInDiv = require('../utils/writeInDiv'),
	Move = require('./Move'),
	constants = require('./constants'),
	signalBus = require('./signalBus'),
	sample = require('../utils/sampleArray');

module.exports = function() {

	var _deferred,
		_allMovesString,
		_numMoves,
		_classPostFix,
		_chanceOfFailing,
		_delay,
		_chain,
		_currentMove,
		_isAutomatedPlayer;


	function init(divClass, numMoves, delay, isAutomatedPlayer, chanceOfFailing) {

		_numMoves = numMoves;
		_deferred = Q.defer();
		_classPostFix = divClass;
		_delay = delay;
		_chanceOfFailing = chanceOfFailing;
		_isAutomatedPlayer = isAutomatedPlayer;

		createCombo();

		if(!_isAutomatedPlayer) {

			signalBus.ACTION_FIRED.add(onActionFired);
		}
	}

	function createCombo() {

		var i = 0;

		_allMovesString = '';

		_chain = [];

		for(i; i < _numMoves; i++) {

			_allMovesString += addRandomMove() + ', ';
		}

		_allMovesString += '<br>';
	}

	function destroy() {

		var i = 0;

		if(_currentMove) {

			_currentMove.destroy();
		}

		for(i; i < _chain.length; i++) {

			_chain[i].destroy();
		}

		_chain = null;
		signalBus.ACTION_FIRED.remove(onActionFired);
	}

	function onActionFired(firedAction) {

		if(_currentMove) {

			_currentMove.fireAction(firedAction);
		}
	}

	function addRandomMove() {

		var randomAction = sample(constants.ALL_ACTIONS),
			newMove = new Move(randomAction, _delay);

		_chain.push(newMove);

		return randomAction;
	}

	function start() {

		validateChain();

		writeInDiv(_classPostFix, 'Get READY!');

		return _deferred.promise;
	}

	function validateChain() {

		_currentMove = _chain.shift();

		if(_currentMove) {

			_currentMove.stateIsOnTimeSignal.add(onCurrentMoveIsReady);
			executeMove();

		} else {

			_deferred.resolve();
		}
	}

	function executeMove() {

		_currentMove.execute()
			.then(moveExecuted)
			.fail(moveFailed)
			.fin(moveFinished)
	}

	function onCurrentMoveIsReady() {

		var requestedAction = _currentMove.getRequestedAction(),
			shouldFail;

		if(_isAutomatedPlayer) {

			shouldFail = Math.random() < _chanceOfFailing;

			if(shouldFail) {

				_currentMove.fireAction();

			} else {

				_currentMove.fireAction(requestedAction);
			}

		} else {

			writeInDiv(_classPostFix, _allMovesString);
		}
	}

	function moveExecuted() {

		if(_isAutomatedPlayer) {

			writeInDiv(_classPostFix, 'AI has ' + _chain.length + ' moves left');

		} else {

			writeInDiv(_classPostFix, _allMovesString + 'Got it!');
		}
	}

	function moveFailed(message) {

		createCombo();

		if(!_isAutomatedPlayer) {

			writeInDiv(_classPostFix, _allMovesString + 'Woops, ' + message);

		} else {

			writeInDiv(_classPostFix, 'AI missed!');
		}
	}

	function moveFinished() {

		_currentMove.destroy();
		validateChain();
	}

	this.init = init;
	this.start = start;
	this.destroy = destroy;
};