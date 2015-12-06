var config = require('../config'),
	gulp = require('gulp');

module.exports = function(taskName) {

	gulp.task(taskName, function () {

		return gulp.src(config.copyStaticAssets.src)
			.pipe(gulp.dest(config.copyStaticAssets.dest));
	});
};
