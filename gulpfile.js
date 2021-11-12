const gulp = require("gulp");
const sass = require("gulp-sass");
const browserSync = require("browser-sync");
sass.compiler = require('node-sass');
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const rename = require('gulp-rename');
const { Minimatch } = require("minimatch");

function makeCss(){
  return gulp.src("src/main.scss")
    .pipe(sass())
    .pipe(autoprefixer({cascade:false}))
    .pipe(cleanCSS())
    .pipe(rename("minifiedCSS.css"))
    .pipe(gulp.dest("www/"))   
}

function watch(){
  browserSync.init({
    browser: ["chrome"],
    server: "./www"
  });
  gulp.watch("src/*.scss", makeCss);
  gulp.watch("src/*.scss").on('change', browserSync.reload);
  gulp.watch("www/*.html").on('change', browserSync.reload);
}
module.exports.makeCss = makeCss;
module.exports.watch = watch;