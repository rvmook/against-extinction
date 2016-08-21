var HumanController = require('./controllers/HumanController'),
	AIController = require('./controllers/AIController'),
	Level = require('./core/Level'),
	Player = require('./core/Player'),
	globals = require('./core/globals');


var LEVEL_ONE_AI_DELAY = 1500;

var playerA = new Player('you', new HumanController()),
	playerB = new Player('CPU', new AIController(LEVEL_ONE_AI_DELAY)),
	level1 = new Level(playerA, playerB, {
		total:globals.totalCombos,
		size:globals.comboSize,
		showDelay:globals.comboShowDelay,
		hideDelay:globals.comboHideDelay
	});

level1.init();
level1.finished.add(onFinished);
level1.start();

function onFinished(winner, loser) {

	console.log(winner.id, 'won,', loser.id, 'lost');

	level1.destroy();
}