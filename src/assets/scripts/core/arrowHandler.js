var arrowContainerEl = document.querySelector('.js-arrowContainer'),
	timeout;

exports.destroy = function() {

	arrowContainerEl.innerHTML = '';
	arrowContainerEl.classList.add('is-hidden');

	clearTimeout(timeout);
};

exports.update = function(combo) {

	var arrows = combo.getMoves(),
		arrow,
		i;

	arrowContainerEl.innerHTML = '';
	arrowContainerEl.classList.add('is-hidden');
	clearTimeout(timeout);
	timeout = setTimeout(
	function(){


	for(i = 0; i < arrows.length; i++) {

		arrow = arrows[i];

		arrowContainerEl.appendChild(createArrowEl(arrow));
	}

	arrowContainerEl.classList.remove('is-hidden');
	}, 100);
};

function createArrowEl(modifierClass) {

	var div = document.createElement('div');

	div.className = 'arrow arrow--' + modifierClass;

	return div;
}