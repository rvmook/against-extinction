var Signal = require('../libs/signals');

module.exports = function(){

	var _moveFired = new Signal();

	function init() {

	}

	function destroy() {

		_moveFired.removeAll();
	}

	this.init = init;
	this.moveFired = _moveFired;
	this.destroy = destroy;
};