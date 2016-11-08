var arrowContainerEl = document.querySelector('.js-arrowContainer'),
	_arrows;

module.exports = function(_player, _el) {

	_player.comboUpdated.add(onComboUpdated);
	_player.finished.add(onFinished);

	function onFinished() {
		_el.style.width = '100%';
	}

	function onComboUpdated(combo, index, total) {
		_el.style.width = (index / total * 100) + '%';
	}
};