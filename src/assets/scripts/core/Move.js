var Q = require('../utils/kew'),
	Signal = require('../utils/signals');

module.exports = function(action, delay, hasLogs) {

	var STATE_TOO_SOON = 0,
		STATE_ON_TIME = 1;

	var _timer,
		_deferred,
		_stateIsOnTimeSignal = new Signal(),
		_currentState = STATE_TOO_SOON,
		_requestedAction = action,
		_delay = delay;


	function execute() {

		_deferred = Q.defer();

		startTimer(_delay, onDelayFinished);

		return _deferred.promise;
	}

	function onDelayFinished() {

		_currentState = STATE_ON_TIME;
		_stateIsOnTimeSignal.dispatch(_requestedAction);
	}

	function fireAction(firedAction) {

		killTimer();

		if(_currentState === STATE_TOO_SOON) {

			_deferred.reject('too soon!');

		} else if(firedAction !== _requestedAction) {

			_deferred.reject('wrong action!');

		} else {

			_deferred.resolve('success!');
		}
	}

	function getRequestedAction() {

		return _requestedAction;
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

	this.stateIsOnTimeSignal = _stateIsOnTimeSignal;
	this.getRequestedAction = getRequestedAction;
	this.fireAction = fireAction;
	this.execute = execute;
	this.destroy = destroy;
};