const {src, dest, parallel, series, watch} = require('gulp');
const browserSync = require('browser-sync').create();
const fileInclude = require('gulp-file-include');
const del = require('del');
const scss = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
// const groupMedia = require("gulp-group-css-media-queries");
const cleanCss = require('gulp-clean-css');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify-es').default;
const imagemin = require("gulp-imagemin");
// const webp = require('gulp-webp');
// const webpHtml = require('gulp-webp-html');
// const ttf2woff = require('gulp-ttf2woff');
// const ttf2woff2 = require('gulp-ttf2woff2');

const projectFolder = 'dist';
const sourceFolder = "#src";

const path = {
   build: { 
      html: projectFolder + "/",
      css: projectFolder + "/assets/css/",
      js: projectFolder + "/assets/js/",
      img: projectFolder + "/assets/img/",
      fonts: projectFolder + "/assets/fonts/",
   },
   src: {
      html: [sourceFolder +"/*.html", "!" + sourceFolder + "/_*.html"],
      css: sourceFolder + "/assets/scss/style.scss",
      js: sourceFolder + "/assets/js/**/*.js",
      img: sourceFolder + "/assets/img/**/*.{jpg,png,svg,gif,ico,webp}",
      fonts: sourceFolder + "/assets/fonts/**/*.{ttf,eot,woff,woff2}",
   },
   watch: {
      html: sourceFolder +"/**/*.html",
      css: sourceFolder + "/assets/scss/**/*.scss",
      js: sourceFolder + "/assets/js/**/*.js",
      img: sourceFolder + "/assets/img/**/*.{jpg,png,svg,gif,ico,webp}",
      fonts: sourceFolder + "/assets/fonts/**/*.{ttf,eot,woff,woff2}",
   },
   clean: "./" + projectFolder + "/"
};
   
 
function server() {
   browserSync.init({
      
      server: {
         baseDir: "./" + projectFolder + "/"
      },
      port: 3000
   });
}


function html() {
   return src(path.src.html)
      .pipe(fileInclude())
      // .pipe(webpHtml())
      .pipe(dest(path.build.html))
      .pipe(browserSync.stream());
}

function css() {
      return src(path.src.css)
         // .pipe(groupMedia())
         .pipe(scss())
         .pipe(autoprefixer({
            overrideBrowserslist: ["last 5 versions"],
            cascade: true
         }))
         .pipe(dest(path.build.css))
         .pipe(cleanCss())
         .pipe(rename({
            extname: ".min.css"
         }))
         .pipe(dest(path.build.css))
         .pipe(browserSync.stream());
}

function fonts() {
   return src(path.src.fonts) 
      .pipe(dest(path.build.fonts));
}

function js() {
   return src(path.src.js)
      .pipe(fileInclude())
      .pipe(dest(path.build.js))
      // .pipe(uglify())
      // .pipe(rename({
      //    extname: ".min.js"
      // }))
      .pipe(dest(path.build.js))
      .pipe(browserSync.stream());
}
 
function images() {
   return src(path.src.img)
      // .pipe(
      //    webp({
      //       quality: 70
      //    })
      // )
      .pipe(dest(path.build.img))
      .pipe(src(path.src.img))
      .pipe(
         imagemin({
            propressive: true,
            svgoPlugins: [{removeViewBox: false}],
            intarlased: true,
            optimisationLever: 3 //0 to 7
      }))
      .pipe(dest(path.build.img))
      .pipe(browserSync.stream());
}

function watchFiles(){
   watch([path.watch.html], html);
   watch([path.watch.css], css);
   watch([path.watch.js], js);
   watch([path.watch.img], images);
   watch([path.watch.fonts], fonts);
}

function clean() {
   return del(path.clean);
}

const build = series(clean, parallel(js, css, html, images, fonts));
const Watch = parallel(build, watchFiles, server);

exports.fonts = fonts;
exports.images = images;
exports.js = js;
exports.css = css;
exports.html = html;
exports.default = Watch;