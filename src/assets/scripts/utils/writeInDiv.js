var els = {
	player : document.getElementsByClassName('text--player')[0],
	general : document.getElementsByClassName('text--general')[0],
	ai : document.getElementsByClassName('text--ai')[0]
};

module.exports = function(classPostFix, text) {

	els[classPostFix].innerHTML = text;
};