var Q = require('../utils/kew'),
	signalBus = require('./signalBus');

module.exports = function(action, delay) {

	var STATE_TOO_SOON = 0,
		STATE_ON_TIME = 1;

	var _timer,
		_deferred,
		_currentState = STATE_TOO_SOON,
		_requestedAction = action,
		_delay = delay;


	function execute() {

		_deferred = Q.defer();

		console.log('Ready?');

		signalBus.ACTION_FIRED.add(onActionFired);
		startTimer(_delay, onDelayFinished);

		return _deferred.promise;
	}

	function onDelayFinished() {

		console.log('FIRE!', _requestedAction);
		_currentState = STATE_ON_TIME;
	}

	function onActionFired(firedAction) {

		killTimer();

		if(_currentState === STATE_TOO_SOON) {

			_deferred.reject('too soon!');

		} else if(firedAction !== _requestedAction) {

			_deferred.reject('wrong action!');

		} else {

			_deferred.resolve('success!');
		}
	}

	function destroy() {

		signalBus.ACTION_FIRED.remove(onActionFired);
		killTimer();
	}

	function killTimer() {

		clearTimeout(_timer);
	}

	function startTimer(delay, callback) {

		_timer = setTimeout(callback, delay);
	}

	this.execute = execute;
	this.destroy = destroy;
};