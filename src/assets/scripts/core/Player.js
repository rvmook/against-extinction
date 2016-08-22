var Signal = require('../libs/signals'),
	Combo = require('./Combo');

module.exports = function(id, _controller){

	var _isOnTime,
		_finished = new Signal(),
		_updated = new Signal(),
		_showDelay,
		_hideDelay,
		_currentComboIndex,
		_currentCombo,
		_showTimeout,
		_hideTimeout,
		_combos;

	function init(comboConfigs, showDelay, hideDelay) {

		var comboConfig,
			i;

		_currentComboIndex = 0;
		_isOnTime = !(_showDelay > 0 && _hideDelay > 0);
		_combos = [];
		_showDelay = showDelay;
		_hideDelay = hideDelay;

		for(i = 0; i < comboConfigs.length; i++) {

			comboConfig = comboConfigs[i];

			_combos.push(new Combo(
				comboConfig.moves.slice(0)
			));
		}

		return _controller.init();
	}

	function start() {

		_controller.moveFired.add(onMoveFired);
		nextCombo();
	}


	function destroy() {

		killTimers();
		_updated.removeAll();
		_finished.removeAll();
		_controller.destroy();
		_controller.moveFired.remove(onMoveFired);
	}

	function onMoveFired(move) {

		if(_isOnTime) {

			_currentCombo.executeMove(move);

		} else {

			console.log('too soon!');

			killTimers();
			_showTimeout = setTimeout(startTimerSequence, _showDelay);
		}
	}

	function nextCombo() {

		if(_currentCombo) {

			_currentCombo.destroy();
		}

		_currentCombo = _combos[_currentComboIndex];

		_currentComboIndex++;


		if(!_currentCombo) {

			console.log('DONE!');
			_finished.dispatch();

		} else {

			_currentCombo.finished.add(nextCombo);
			_currentCombo.wrong.add(onWrong);
			startTimerSequence();
		}
	}

	function onWrong(){

		console.log('wrong move!');
		startCombo();
	}

	function startTimerSequence() {

		if(_showDelay > 0 || _hideDelay > 0) {

			console.log('get ready...');
		}

		killTimers();
		_isOnTime = false;
		_showTimeout = setTimeout(startCombo, _showDelay);
	}


	function killTimers() {

		clearTimeout(_showTimeout);
		clearTimeout(_hideTimeout);
	}

	function startCombo() {


		_currentCombo.start();

		killTimers();
		_hideTimeout = setTimeout(hideReady, _hideDelay);


		function hideReady() {

			killTimers();
			_isOnTime = true;
			console.log('dispatch updated');
			_updated.dispatch(_currentCombo);

			_controller.isOnTime(_currentCombo);
			console.log('go!');
		}
	}

	this.id = id;
	this.init = init;
	this.destroy = destroy;
	this.finished = _finished;
	this.updated = _updated;
	this.start = start;
};