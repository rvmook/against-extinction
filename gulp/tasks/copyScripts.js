var config = require('../config'),
	browserSync = require('../util/browserSync'),
	gulpif = require('gulp-if'),
	uglify = require('gulp-uglify'),
	gulp = require('gulp');

module.exports = function(taskName) {

	gulp.task(taskName, function () {

		return gulp.src(config.copyScripts.src)
			.pipe(gulpif(global.isProd, uglify(config.uglify)))
			.pipe(gulp.dest(config.copyScripts.dest))
			.pipe(gulpif(!global.isProd, browserSync.stream()));
	});
};
