var Q = require('../utils/kew'),
	Move = require('./Move'),
	constants = require('./constants'),
	signalBus = require('./signalBus'),
	sample = require('../utils/sampleArray');

module.exports = function() {

	var _deferred,
		_chanceOfFailing,
		_delay,
		_chain,
		_currentMove,
		_isAutomatedPlayer;


	function init(numMoves, delay, isAutomatedPlayer, chanceOfFailing) {

		var i = 0;

		_deferred = Q.defer();
		_chain = [];
		_delay = delay;
		_chanceOfFailing = chanceOfFailing;
		_isAutomatedPlayer = isAutomatedPlayer;

		for(i; i < numMoves; i++) {

			addRandomMove();
		}

		if(!_isAutomatedPlayer) {

			signalBus.ACTION_FIRED.add(onActionFired);
		}
	}

	function destroy() {

		var i = 0;

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
	}

	function start() {

		validateChain();

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

			shouldFail = Math.random() > _chanceOfFailing;

			if(shouldFail) {

				_currentMove.fireAction();

			} else {

				_currentMove.fireAction(requestedAction);
			}

		} else {

			console.log('FIRE!', requestedAction);
		}
	}

	function moveExecuted() {

		if(_isAutomatedPlayer) {

			console.log('AI has ' + _chain.length + ' moves left');
		} else {

			console.log('Got it!');
		}
	}

	function moveFailed(message) {

		if(!_isAutomatedPlayer) {

			console.log('Woops', message);
		}

		addRandomMove();
	}

	function moveFinished() {

		_currentMove.destroy();
		validateChain();
	}

	this.init = init;
	this.start = start;
	this.destroy = destroy;
};