var HumanController = require('./controllers/HumanController'),
	AIController = require('./controllers/AIController'),
	Level = require('./core/Level'),
	Player = require('./core/Player'),
	MainComboUi = require('./modules/MainComboUi'),
	globals = require('./core/globals');

var pixiHandler = require('./core/pixiHandler'),
	arrowHandler = require('./core/arrowHandler');

pixiHandler.init();


var LEVEL_ONE_AI_DELAY = 500;

var playerA = new Player('you', new HumanController()),
	playerB = new Player('CPU', new AIController(LEVEL_ONE_AI_DELAY)),
	level1 = new Level(playerA, playerB, {
		total:globals.totalCombos,
		size:globals.comboSize,
		showDelay:globals.comboShowDelay,
		hideDelay:globals.comboHideDelay
	});

var op = new MainComboUi(playerA);

level1.init();
level1.finished.add(onFinished);
level1.start();


//
// function onPlayerUpdated(moves) {
//
// 	console.log('moves', moves);
// 	arrowHandler.update(moves);
// }



function onFinished(winner, loser) {

	console.log(winner.id, 'won,', loser.id, 'lost');

	arrowHandler.destroy();
	level1.destroy();
}