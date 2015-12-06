var config = require('../config'),
	gulp = require('gulp'),
	gulpif = require('gulp-if'),
	sass = require('gulp-sass'),
	handleErrors = require('../util/handleErrors'),
	browserSync = require('../util/browserSync'),
	autoprefixer = require('gulp-autoprefixer');

module.exports = function(taskName) {

	gulp.task(taskName, function () {

		return gulp.src(config.styles.src)
			.pipe(sass({
				sourceComments: global.isProd ? 'none' : 'map',
				sourceMap: 'sass',
				outputStyle: global.isProd ? 'compressed' : 'expanded'
			}))
			.on('error', handleErrors)
			.pipe(autoprefixer('last 2 versions', '> 1%', 'ie >= 9'))
			.on('error', handleErrors)
			.pipe(gulp.dest(config.styles.dest))
			.pipe(gulpif(!global.isProd, browserSync.stream()))
	});
};