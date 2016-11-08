module.exports = function(_player) {

	init();

	function init() {

		_player.finished.add(onFinished);
		_player.destroyed.add(onDestroyed);
		_player.comboUpdated.add(onComboUpdated);
	}

	function onComboUpdated(combo) {

		combo.started.add(onStarted);
		combo.updated.add(onUpdated);
		combo.finished.add(onFinished);
		combo.wrong.add(onWrong);

		var i,
			move,
			actions = [],
			moves = combo.getMoves();

		for(i = 0; i < moves.length; i++) {

			move = moves[i];
			actions.push(move.action);
		}


		function onStarted() {

			console.clear();
			console.log('go!');
		}

		function onWrong(firedAction) {

			console.log(firedAction + ' is wrong...');
		}

		function onFinished() {

			console.log('combo finished!');
		}

		function onUpdated() {

			var actions = [];

			combo.getMoves().forEach(function(move) {

				actions.push(move.action, move.isExecuted);
			});


			console.log.apply(this, actions);
		}
	}

	function onFinished(e) {
		console.log('onFinished', e);
	}

	function onDestroyed() {
		console.log('onDestroyed');
	}
};
