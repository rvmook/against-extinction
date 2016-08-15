var Q = require('../libs/kew'),
	Combo = require('./Combo');

var counter = 0;

module.exports = function(_controller){

	var _deferred,
		_currentCombo,
		_combos;

	var id = counter++;

	function init(comboConfigs) {

		var comboConfig,
			i;

		_combos = [];

		for(i = 0; i < comboConfigs.length; i++) {

			comboConfig = comboConfigs[i];

			_combos.push(new Combo(
				comboConfig.moves.slice(0),
				comboConfig.showDelay,
				comboConfig.hideDelay
			));
		}

		return _controller.init();
	}

	function onMoveFired(move) {

		console.log('player.moveFired',_currentCombo.getId(), id);
		_currentCombo.executeMove(move);
	}

	function nextCombo() {

		if(_currentCombo) {

			_currentCombo.destroy();
		}

		_currentCombo = _combos.shift();
		console.log('_currentCombo.getId()', _currentCombo.getId(),  id);

		if(!_currentCombo) {

			_deferred.resolve('success!');

		} else {

			_currentCombo.start()
				.then(function(){

					console.log('next combo', id);
					nextCombo();
				})
				.fail(function(){

					console.log('try again!', id);
				})
		}
	}

	function start() {

		_deferred = Q.defer();

		_controller.moveFired.add(onMoveFired);
		nextCombo();


		return _deferred.promise;
	}


	this.init = init;
	this.start = start;
};