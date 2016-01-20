var gulp = require('gulp')
var uglify = require('gulp-uglifyjs');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat-util');
var minifyCss = require('gulp-minify-css');
var assets = require('./assets.js')

gulp.task('default', function(){

  if (process.env.FASTLY_API_KEY) {
    require('fastly')(process.env.FASTLY_API_KEY).purgeAll(process.env.FASTLY_SERVICE_ID, function (err, obj) {
      if (err) return console.dir(err)
    })
  }

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
