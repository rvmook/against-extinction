var COMBO_SCREAM = 'COMBO_SCREAM',
	COMBO_LEFT = 'COMBO_LEFT',
	COMBO_RIGHT = 'COMBO_RIGHT',
	COMBO_TOP = 'COMBO_TOP',
	COMBO_BOTTOM = 'COMBO_BOTTOM',

	KEY_SPACE = 32,
	KEY_LEFT = 37,
	KEY_UP = 38,
	KEY_RIGHT = 39,
	KEY_DOWN = 40,

	KEY_MAP = {},
	COMMAND_MAP = {};

KEY_MAP[COMBO_SCREAM] = KEY_SPACE;
KEY_MAP[COMBO_LEFT] = KEY_LEFT;
KEY_MAP[COMBO_RIGHT] = KEY_RIGHT;
KEY_MAP[COMBO_TOP] = KEY_UP;
KEY_MAP[COMBO_BOTTOM] = KEY_DOWN;

COMMAND_MAP[COMBO_SCREAM] = 'Press Space!';
COMMAND_MAP[COMBO_LEFT] = 'Press Left!';
COMMAND_MAP[COMBO_RIGHT] = 'Press Right!';
COMMAND_MAP[COMBO_TOP] = 'Press Up!';
COMMAND_MAP[COMBO_BOTTOM] = 'Press Down!';

var gui = new dat.GUI(),
	game = new Game();

gui.add(game, 'fight');
gui.add(game, 'maxMoveCount', 1, 5).step(1);

var _elCommand = document.getElementsByClassName('command')[0],
	guiCombos = gui.addFolder('Combo config'),
	screamComboToggle = guiCombos.add(game.combos, COMBO_SCREAM),
	leftComboToggle = guiCombos.add(game.combos, COMBO_LEFT),
	rightComboToggle = guiCombos.add(game.combos, COMBO_RIGHT),
	topComboToggle = guiCombos.add(game.combos, COMBO_TOP),
	bottomComboToggle = guiCombos.add(game.combos, COMBO_BOTTOM);

screamComboToggle.onChange(game.comboToggle);
leftComboToggle.onChange(game.comboToggle);
rightComboToggle.onChange(game.comboToggle);
topComboToggle.onChange(game.comboToggle);
bottomComboToggle.onChange(game.comboToggle);

game.init();

function Game() {

	var isFighting = false,
		_currentCombos,
		_moveCount,
		_availableCombos = [],
		_pendingKey,
		_self = this;

	function init() {

		_self.comboToggle();
		window.addEventListener('keyup', onKeyUp);
	}

	function onKeyUp(e) {

		if(_pendingKey === e.keyCode) {

			goodMove();

		} else {

			badMove();
		}
	}

	function goodMove() {

		_moveCount++;

		if(_moveCount >= _self.maxMoveCount) {

			updateCommand('WIN!');

		} else {

			nextMove();
		}
	}

	function badMove() {

		console.log('WRONG!');
	}

	function fight() {

		_moveCount = 0;
		_currentCombos = shuffle(_availableCombos);

		nextMove();
	}

	function nextMove() {

		var currentMove;

		currentMove = getNextCombo();

		_pendingKey = KEY_MAP[currentMove];

		updateCommand(COMMAND_MAP[currentMove]);
	}

	function updateCommand(label) {

		_elCommand.innerHTML = label;
	}

	function getNextCombo() {

		var nextCombo = Math.round(Math.random() * (_availableCombos.length - 1));

		return _availableCombos[nextCombo];
	}

	function comboToggle() {

		_availableCombos = [];

		if(_self.combos[COMBO_SCREAM]) {

			_availableCombos.push(COMBO_SCREAM);
		}

		if(_self.combos[COMBO_LEFT]) {

			_availableCombos.push(COMBO_LEFT);
		}

		if(_self.combos[COMBO_RIGHT]) {

			_availableCombos.push(COMBO_RIGHT);
		}

		if(_self.combos[COMBO_TOP]) {

			_availableCombos.push(COMBO_TOP);
		}

		if(_self.combos[COMBO_BOTTOM]) {

			_availableCombos.push(COMBO_BOTTOM);
		}
	}


	this.maxMoveCount = 3;
	this.combos = {
		COMBO_SCREAM: true,
		COMBO_LEFT: true,
		COMBO_RIGHT: true,
		COMBO_TOP: true,
		COMBO_BOTTOM: true
	};

	this.comboToggle = comboToggle;
	this.fight = fight;
	this.init = init;
}

/**
 * Shuffle array items.
 */
function shuffle(arr) {
	var results = [],
			rnd;
	if (arr == null) {
		return results;
	}

	var i = -1, len = arr.length;
	while (++i < len) {
		if (!i) {
			results[0] = arr[0];
		} else {
			rnd = Math.round( Math.random() * i);
			results[i] = results[rnd];
			results[rnd] = arr[i];
		}
	}

	return results;
}