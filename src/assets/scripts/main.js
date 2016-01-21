var actionHandler = require('./core/actionHandler'),
	constants = require('./core/constants'),
	Move = require('./core/Move');


var move1 = new Move(constants.ACTION_DOWN, 1000);


actionHandler.init();



move1.execute();