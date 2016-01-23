var Move = require('./Move'),
	constants = require('./constants'),
	sample = require('../utils/sampleArray');

module.exports = function(numMoves, delay) {

	var _moveDelay = delay,
		_chain = [],
		_numMoves = numMoves;


	init();


	function init() {

		var i = 0;

		for(i; i < _numMoves; i++) {

			addRandomMove();
		}
	}

	function addRandomMove() {

		var randomAction = sample(constants.ALL_ACTIONS),
			newMove = new Move(randomAction, _moveDelay);

		_chain.push(newMove);
	}

	function start() {

		executeNextMove();
	}

	function executeNextMove() {

		var nextMove = _chain.shift();

		if(nextMove) {

			nextMove.execute()
				.then(function() {

					nextMove.destroy();
				})
				.fail(function(message) {

					console.log('ComboChain - woops', message);
					addRandomMove();


				})
				.fin(function(){

					nextMove.destroy();
					executeNextMove();
				})

		} else {

			console.log('DONE!');
		}
	}

	this.start = start;
};