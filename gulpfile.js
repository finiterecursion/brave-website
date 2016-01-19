var gulp = require('gulp')
var uglify = require('gulp-uglifyjs');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat-util');
var minifyCss = require('gulp-minify-css');
var assets = require('./assets.js')

gulp.task('default', function(){

  gulp.src(assets.jsSrc)
    .pipe(sourcemaps.init())
    .pipe(concat('scripts.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./public'))
    .on('error', function (err) {
      console.log(err) })

  gulp.src(assets.cssSrc)
    .pipe(sourcemaps.init())
    .pipe(minifyCss())
    .pipe(concat('styles.css'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./public'))
    .on('error', function (err) {
      console.log(err) })
})
