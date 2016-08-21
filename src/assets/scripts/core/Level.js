var sample = require('../utils/sampleArray'),
	constants = require('./constants'),
	Signal = require('../libs/signals');

module.exports = function(player, enemy, comboSettings){


	var _comboSequence = createComboSequence(
		comboSettings.total,
		comboSettings.size
	),

	_finished = new Signal();

	function init() {

		player.init(
			_comboSequence.slice(0),
			comboSettings.showDelay,
			comboSettings.hideDelay
		);

		enemy.init(
			_comboSequence.slice(0),
			comboSettings.showDelay,
			comboSettings.hideDelay
		);
	}

	function start() {

		player.finished.add(onPlayerFinished);
		enemy.finished.add(onEnemyFinished);

		player.start();
		enemy.start();


		function onEnemyFinished(){

			_finished.dispatch(enemy, player);
		}

		function onPlayerFinished(){

			_finished.dispatch(player, enemy);
		}
	}

	function createComboSequence(total, size) {


		var sequence = [],
			i;

		for(i = 0; i < total;i++) {

			sequence.push(createComboConfig(size));
		}

		return sequence;
	}

	function destroy() {

		_finished.removeAll();
		player.destroy();
		enemy.destroy();
	}

	this.init = init;
	this.destroy = destroy;
	this.finished = _finished;
	this.start = start;
};

function createComboConfig(size) {

	return {
		moves: createMoves()
	};

	function createRandomMove() {

		return sample(constants.ALL_MOVES);
	}

	function createMoves() {

		var i = 0,
			moves = [],
			move;

		for(i; i < size; i++) {

			move = createRandomMove();

			moves.push(move);
		}

		return moves;
	}
}