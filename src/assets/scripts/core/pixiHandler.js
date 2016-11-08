var _renderer,
	_stage,
	_container,
	_mcTurtle,
	_mcTrex,
	_bottomLine,
	_win = window;

function onResize() {

	var width = Math.max(768, _win.innerWidth);

	_stage.filterArea = new PIXI.Rectangle(0,0,width, _win.innerHeight);
	_renderer.resize(width, _win.innerHeight);



	_container.x = width / 2;
	_container.y = _win.innerHeight * 0.8;

	var mcOffset = width * 0.3,
		strokeOffset = width * 0.45;

	_mcTrex.x = -mcOffset;
	_mcTurtle.x = mcOffset;

	_bottomLine.clear();
	_bottomLine.lineStyle(3, 0x000000);
	_bottomLine.moveTo(-strokeOffset,-3);
	_bottomLine.lineTo(strokeOffset, -3);
}

function init() {


	// removes the PIXI debug log
	PIXI.utils._saidHello = true;

	_renderer = PIXI.autoDetectRenderer(_win.innerWidth, _win.innerHeight,{
		resolution:2
	});
	_renderer.backgroundColor = 0xd7fff7;
	document.body.appendChild(_renderer.view);


	// create the root of the scene graph
	_stage = new PIXI.Container();

	loadSpriteSheets();

	function loadSpriteSheets() {

		PIXI.loader
			.add('/assets/images/sprites/turtle.json')
			.add('/assets/images/sprites/trex-0.json')
			.add('/assets/images/sprites/trex-1.json')
			.load(onSpritesLoaded);

		animate();
	}



	function animate() {

		// render the stage container
		_renderer.render(_stage);

		requestAnimationFrame(animate);
	}


	function onSpritesLoaded() {

		_container = new PIXI.Sprite();

		_mcTrex = createMovieClip('trex-', 116);
		_mcTurtle = createMovieClip('turtle-', 52);

		_bottomLine = new PIXI.Graphics();


		_mcTrex.anchor.set(0.5, 1);
		_mcTurtle.anchor.set(0.5, 1);

		_stage.addChild(_container);

		_container.addChild(_mcTrex);
		_container.addChild(_mcTurtle);
		_container.addChild(_bottomLine);


		_mcTurtle.y = 15;

		_mcTrex.play();
		_mcTurtle.play();

		_win.addEventListener('resize', onResize);
		onResize();
	}

	function createMovieClip(framePrefix, numFrames) {

		var frames = [],
			frame;

		for (var i = 0; i < numFrames; i++) {

			frame = i;

			if(i < 100) {

				frame = '0' + frame;
			}

			if(i < 10) {

				frame = '0' + frame;
			}

			frames.push(PIXI.Texture.fromFrame(framePrefix + frame));
		}

		return new PIXI.extras.MovieClip(frames);
	}
}


exports.init = init;