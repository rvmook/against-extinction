var Signal = require('../libs/signals'),
	Combo = require('./Combo');

module.exports = function(id, _controller){

	var _isOnTime,
		
		_finished = new Signal(),
		_destroyed = new Signal(),
		_comboUpdated = new Signal(),

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

		_destroyed.dispatch();

		killTimers();
		_comboUpdated.removeAll();
		_finished.removeAll();
		_destroyed.removeAll();
		_controller.destroy();
		_controller.moveFired.remove(onMoveFired);
	}

	function onMoveFired(move) {

		if(_isOnTime) {

			_currentCombo.executeMove(move);

		} else {

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

			_finished.dispatch();

		} else {

			_comboUpdated.dispatch(_currentCombo);

			_currentCombo.finished.add(nextCombo);
			_currentCombo.wrong.add(onWrong);

			startTimerSequence();
		}
	}

	function onWrong(){

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
			_controller.isOnTime(_currentCombo);
		}
	}

	this.id = id;
	this.init = init;
	this.destroy = destroy;
	this.finished = _finished;
	this.destroyed = _destroyed;
	this.comboUpdated = _comboUpdated;
	this.start = start;
};