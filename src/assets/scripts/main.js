var actionHandler = require('./core/actionHandler'),
	constants = require('./core/constants'),
	ComboChain = require('./core/ComboChain');


var chain = new ComboChain(5, 1000);


actionHandler.init();

chain.start();