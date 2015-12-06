var gulp = require('gulp'),
	runSequence = require('run-sequence');

module.exports = function(taskName) {

	gulp.task(taskName, ['cleanAssets'], function (cb) {

		cb = cb || function (e) {
		};

		var args = ['styles', 'html', 'browserify', 'copyStaticAssets'];

		if (!global.isProd) {

			args.push('watch');
		}

		args.push(cb);

		return runSequence.apply(this, args);
	});
};