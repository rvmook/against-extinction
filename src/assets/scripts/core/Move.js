var signalBus = require('./signalBus');

module.exports = function(action, delay) {

	var STATE_TOO_SOON = 0,
		STATE_ON_TIME = 1;

	var _timer,
		_currentState = STATE_TOO_SOON,
		_requestedAction = action,
		_delay = delay;


	function execute() {

		/*

			Show ready
			Start delay
			Show action
			Start duration
			Show too late

		 */

		console.log('ready?', _delay);

		signalBus.ACTION_FIRED.add(onActionFired);
		startTimer(_delay, onDelayFinished);
	}

	function onDelayFinished() {

		console.log('FIRE!', _requestedAction);
		_currentState = STATE_ON_TIME;
	}

	function onActionFired(firedAction) {

		killTimer();

		if(_currentState === STATE_TOO_SOON) {

			console.log('too soon!');

		} else if(firedAction !== _requestedAction) {

			console.log('wrong action!');

		} else {

			console.log('success!');
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

		console.log('startTimer', delay);

		_timer = setTimeout(callback, delay);
	}

	this.execute = execute;
	this.destroy = destroy;
};