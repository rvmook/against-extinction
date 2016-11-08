var HumanController = require('./controllers/HumanController'),
	AIController = require('./controllers/AIController'),
	Level = require('./core/Level'),
	Player = require('./core/Player'),
	MainComboUi = require('./modules/MainComboUi'),
	PlayerProgressBar = require('./modules/PlayerProgressBar'),
	globals = require('./core/globals');

var pixiHandler = require('./core/pixiHandler');

pixiHandler.init();


var LEVEL_ONE_AI_DELAY = 1000;

var playerA = new Player('you', new HumanController()),
	playerB = new Player('CPU', new AIController(LEVEL_ONE_AI_DELAY)),
	level1 = new Level(playerA, playerB, {
		total:globals.totalCombos,
		size:globals.comboSize,
		showDelay:globals.comboShowDelay,
		hideDelay:globals.comboHideDelay
	});

var playerArrows = new MainComboUi(playerA),
	playerAProgress = new PlayerProgressBar(playerA, document.querySelector('.js-progressContainer--a')),
	playerBProgress = new PlayerProgressBar(playerB, document.querySelector('.js-progressContainer--b'));

level1.init();
level1.finished.add(onFinished);
level1.start();



function onFinished(winner, loser) {

	console.log(winner.id, 'won,', loser.id, 'lost');

	level1.destroy();
}