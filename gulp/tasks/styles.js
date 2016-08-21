var config = require('../config'),
	gulp = require('gulp'),
	gulpif = require('gulp-if'),
	sourcemaps = require('gulp-sourcemaps'),
	sass = require('gulp-sass'),
	handleErrors = require('../util/handleErrors'),
	browserSync = require('../util/browserSync'),
	autoprefixer = require('gulp-autoprefixer');

module.exports = function(taskName) {

	gulp.task(taskName, function () {

		var sourceMapTarget;

		if(global.isProd) {

			sourceMapTarget = './';
		}

		return gulp.src(config.styles.src)
			.pipe(sourcemaps.init())
			.pipe(sass({
				sourceComments: !global.isProd,
				sourceMap: 'sass',
				outputStyle: global.isProd ? 'compressed' : 'expanded'
			}))
			.on('error', handleErrors)
			.pipe(autoprefixer('last 2 versions', '> 1%', 'ie >= 9'))
			.on('error', handleErrors)
			.pipe(sourcemaps.write(sourceMapTarget))
			.pipe(gulp.dest(config.styles.dest))
			.pipe(gulpif(!global.isProd, browserSync.stream()))
	});
};