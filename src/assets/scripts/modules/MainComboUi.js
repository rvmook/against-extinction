var arrowContainerEl = document.querySelector('.js-arrowContainer'),
	_arrows;

module.exports = function(_player) {

	_player.comboUpdated.add(onComboUpdated);

	function onComboUpdated(combo) {

		combo.started.add(onStarted);
		combo.updated.add(onUpdated);
		combo.finished.add(onFinished);
		combo.wrong.add(onWrong);

		var i,
			move,
			moves = combo.getMoves();

		_arrows = [];

		arrowContainerEl.innerHTML = '';

		for(i = 0; i < moves.length; i++) {

			move = moves[i];
			_arrows.push(addArrow(arrowContainerEl, move));
		}


		function onStarted() {

			show();
		}

		function onWrong() {

			shake();
		}

		function onFinished() {

			hide();
		}

		function onUpdated() {

			var isNextUp = true,
				arrow;

			combo.getMoves().forEach(function(move, index) {

				arrow = _arrows[index];

				if(move.isExecuted || isNextUp) {

					arrow.focus(index * 100);
					isNextUp = move.isExecuted;

				} else {

					arrow.blur();
				}
			});


		}
	}
};

function shake(callback) {

	callback = callback || function(){};

	var counter = 0,
		offset = -10;

	shakeStep();

	function shakeStep() {

		if(counter++ >= 7) {

			callback();
			arrowContainerEl.style.transform = 'translate3d(0,0,0)';

		} else {

			arrowContainerEl.style.transform = 'translate3d(' + offset + 'px,0,0)';

			setTimeout(function(){

				offset *= -1;
				shakeStep();
			}, 50);
		}
	}
}

function show() {

	for(var i = 0; i < _arrows.length; i++) {

		_arrows[i].show(i * 100);
	}
}

function hide() {

	for(var i = 0; i < _arrows.length; i++) {

		_arrows[i].hide();
	}
}


function addArrow(parentEl, move) {

	var arrow = new Arrow(parentEl, move);

	arrow.init();

	return arrow;

}

function Arrow(parentEl, move) {

	var _div;

	this.init = function() {

		_div = document.createElement('div');

		_div.className = 'arrow arrow--' + move.action + ' is-hidden is-blurred';

		if(move.isExecuted) {

			_div.className += ' arrow--executed';
		}

		parentEl.appendChild(_div);
	};

	this.show = function(delay) {

		setTimeout(function(){
			_div.classList.remove('is-hidden')
		}, delay + 50);
	};
	this.hide = function() {

		_div.classList.add('is-hidden');
	};
	this.focus = function() {

		_div.classList.remove('is-blurred')
	};
	this.blur = function() { _div.classList.add('is-blurred'); };

	this.dispose = function() {

		parentEl.removeChild(_div);
	};
}