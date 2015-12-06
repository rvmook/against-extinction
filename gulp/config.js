var	styles = {
		src: 'src/assets/styles/**/*.scss',
		dest: 'dist/assets/styles'
	},
	browserify = {
		entries: ['./src/assets/scripts/main.js'],
		bundleName: 'main.js',
		dest: 'dist/assets/scripts',
		sourcemap: true
	},
	uglify = {
		preserveComments: 'some',
		compress: {
			drop_console: true
		}
	},
	copyStaticAssets = {
		src:[
			'src/assets/**/**',
			'!src/assets/scripts/**',
			'!src/assets/styles/**'
		],
		dest:'dist/assets/'
	},
	copyScripts = {
		src: [
			browserify.root + browserify.bundleName,
			browserify.root + browserify.bundleName + '.map',
			'!' + browserify.root+'main.js'
		],
		dest: './dist/assets/scripts'
	},
	clean = ['dist/assets'];

exports.clean = clean;
exports.styles = styles;
exports.copyScripts = copyScripts;
exports.copyStaticAssets = copyStaticAssets;
exports.browserify = browserify;
exports.uglify = uglify;