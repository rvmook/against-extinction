var actionHandler = require('./core/actionHandler'),
	constants = require('./core/constants'),
	Player = require('./core/Player');


var humanPlayer = new Player();
var aiPlayer = new Player();

actionHandler.init();

humanPlayer.init(5, 1000, false);
aiPlayer.init(5, 1500, true, 0.5);

humanPlayer.start()
	.then(function(){
		console.log('Player Ready!');
		humanPlayer.destroy();
	});
aiPlayer.start()
	.then(function(){
		console.log('AI Ready!');
		aiPlayer.destroy();
	});