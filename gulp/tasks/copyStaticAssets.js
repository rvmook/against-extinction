var config = require('../config'),
	browserSync = require('../util/browserSync'),
	gulpif = require('gulp-if'),
	gulp = require('gulp');

module.exports = function(taskName) {

	gulp.task(taskName, function () {

		return gulp.src(config.copyStaticAssets.src)
			.pipe(gulp.dest(config.copyStaticAssets.dest))
			.pipe(gulpif(!global.isProd, browserSync.stream()));
	});
};
