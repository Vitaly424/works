const {src, dest, parallel, series, watch} = require('gulp');
const browserSync = require('browser-sync').create();
const scss = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const cleanCss = require('gulp-clean-css');
const rename = require('gulp-rename');
const pug = require('gulp-pug');
const sourcemaps = require('gulp-sourcemaps');
const webpackStream = require('webpack-stream');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const fs = require('fs');

function server() {
   browserSync.init({
      server: {
         baseDir: 'build/'
      },
   });
}

function pugPreproc() {
	return src('./src/pug/pages/**/*.pug')
		// .pipe( plumber({
		// 	errorHandler: notify.onError(function(err){
		// 		return {
		// 			title: 'Pug',
		// 			sound: false,
		// 			message: err.message
		// 		}
		// 	})
		// }))
		.pipe(pug({
			pretty: true,
			locals: {
				data: JSON.parse(fs.readFileSync('./src/data/data.json', 'utf8'))
			}
		}))
		.pipe(dest('./build/'))
		.pipe(browserSync.stream())
}
 
function js() {
	return src('./src/js/main.js')
		.pipe(plumber(
				notify.onError({
				title: "JS",
				message: "Error: <%= error.message %>"
			})
		))
		.pipe(webpackStream({
			mode: 'production', /*production - development */
			output: {
			  filename: 'main.js',
			},
			module: {
			  rules: [{
				 test: /\.m?js$/,
				 exclude: /node_modules/,
				 use: {
					loader: 'babel-loader',
					options: {
					  presets: [
						 ['@babel/preset-env', {
							targets: "defaults"
						 }]
					  ]
					}
				 }
			  }]
			},
			// devtool: 'source-map'
		 }))
		 .on('error', function (err) {
			console.error('WEBPACK ERROR', err);
			this.emit('end');
		 })
		 .pipe(dest('./build/assets/js/'))
		 .pipe(browserSync.stream());
} 

function images() {
	return src('./src/img/**/*.*')
	.pipe(dest('./build/assets/img/'))
	.pipe(browserSync.stream())
}

function scssStyle() {
	return src('./src/scss/main.scss')
			.pipe(sourcemaps.init())
			.pipe(scss())
			.pipe(autoprefixer({
				overrideBrowserslist: ["last 4 versions"]
			}))
			// .pipe(sourcemaps.write())
			// .pipe(dest('./build/assets/css/'))
			.pipe(cleanCss())
         .pipe(rename({
            extname: ".min.css"
         }))
			.pipe(dest('./build/assets/css/'))
			.pipe(browserSync.stream())
} 

function fonts(cb) {
	src('./src/fonts/**/*.*') 
	.pipe(dest('./build/assets/fonts'))
	cb();
}

function wathcing(){
   watch(['./src/scss/**/*.scss'], scssStyle);
	watch(['./src/pug/**/*.pug', './src/data/**/*.json'], pugPreproc);
	watch(['./src/js/**/*.js'], js);
	watch(['./src/img/**/*.*'], images);
}

exports.server = server;
exports.images = images;
exports.js = js;
exports.scssStyle = scssStyle;
exports.fonts = fonts;
exports.pugPreproc = pugPreproc;
exports.wathcing = wathcing;
 
exports.default = series(fonts, images, scssStyle, pugPreproc, js, parallel(server, wathcing));