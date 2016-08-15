var HumanController = require('./controllers/HumanController'),
	AIController = require('./controllers/AIController'),
	Level = require('./core/Level'),
	Player = require('./core/Player'),
	globals = require('./core/globals');


var LEVEL_ONE_AI_DELAY = 100;

var playerA = new Player(new HumanController()),
	playerB = new Player(new AIController(LEVEL_ONE_AI_DELAY)),
	level1 = new Level(playerA, playerB, {
		total:globals.totalCombos,
		size:globals.comboSize,
		showDelay:globals.comboShowDelay,
		hideDelay:globals.comboHideDelay
	});

level1.init()
	.then(level1.start)
	.then(function(winPlayer, losePlayer){


		console.log('playerA won');
	})
	.fail(function(e){

		console.error('errer in level', e);
	});