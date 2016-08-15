var sample = require('../utils/sampleArray'),
	constants = require('./constants'),
	Q = require('../libs/kew');

module.exports = function(player, enemy, comboSettings){

	var _comboSequence = createComboSequence(
		comboSettings.total,
		comboSettings.size,
		comboSettings.showDelay,
		comboSettings.hideDelay
	);

	function init() {

		return Q.all(
			player.init(_comboSequence.slice(0)),
			enemy.init(_comboSequence.slice(0))
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

	function createComboSequence(total, size, showDelay, hideDelay) {


		var sequence = [],
			i;

		for(i = 0; i < total;i++) {

			sequence.push(createComboConfig(size, showDelay, hideDelay));
		}

		return sequence;
	}

	this.init = init;
	this.start = start;
};

function createComboConfig(size, showDelay, hideDelay) {

	return {
		moves: createMoves(),
		showDelay: showDelay,
		hideDelay: hideDelay
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