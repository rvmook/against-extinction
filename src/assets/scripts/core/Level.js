var sample = require('../utils/sampleArray'),
	constants = require('./constants'),
	Q = require('../libs/kew');

module.exports = function(player, enemy, comboSettings){

	var _comboSequence = createComboSequence(
		comboSettings.total,
		comboSettings.size
	);

	function init() {

		return Q.all(
			player.init(
				_comboSequence.slice(0),
				comboSettings.showDelay,
				comboSettings.hideDelay
			),
			enemy.init(
				_comboSequence.slice(0),
				comboSettings.showDelay,
				comboSettings.hideDelay
			)
		)
	}

	function start() {

		var deferred = Q.defer();

		player.start()
			.then(function(){

				deferred.resolve(player, enemy);
			});

		enemy.start()
			.then(function(){

				deferred.resolve(enemy, player);
			});

		return deferred.promise;
	}

	function createComboSequence(total, size) {


		var sequence = [],
			i;

		for(i = 0; i < total;i++) {

			sequence.push(createComboConfig(size));
		}

		return sequence;
	}

	this.init = init;
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