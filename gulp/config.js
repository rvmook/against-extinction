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
	html = {
		src: './src/*.html',
		dest: './dist/',
		options: {
			empty:false,// - do not remove empty attributes
			cdata:false,// - do not strip CDATA from scripts
			comments:false,// - do not remove comments
			conditionals:false,// - do not remove conditional internet explorer comments
			spare:false,// - do not remove redundant attributes
			quotes:false,// - do not remove arbitrary quotes
			loose:false // preserve one whitespace
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
exports.html = html;
exports.styles = styles;
exports.copyScripts = copyScripts;
exports.copyStaticAssets = copyStaticAssets;
exports.browserify = browserify;
exports.uglify = uglify;