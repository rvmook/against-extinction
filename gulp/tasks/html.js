var config = require('../config'),
	gulp = require('gulp'),
	gulpif = require('gulp-if'),
	browserSync = require('../util/browserSync'),
	minifyHTML = require('gulp-minify-html');

module.exports = function(taskName) {

	gulp.task(taskName, function () {

		return gulp.src(config.html.src)
			.pipe(gulpif(global.isProd, minifyHTML(config.html.options)))
			.pipe(gulp.dest(config.html.dest))
			.pipe(gulpif(!global.isProd, browserSync.stream()))
	});
};