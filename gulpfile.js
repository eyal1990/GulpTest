var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var autoprefixer = require('gulp-autoprefixer');
var minifycss = require('gulp-minify-css');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var notify = require('gulp-notify');
var cache = require('gulp-cache');
var livereload = require('gulp-livereload');
var del = require('del');

gulp.task('styles', function() {
  return gulp.src('scss/design.scss')
    .pipe(sass({ compass:true, style: 'expanded' }))
    .pipe(gulp.dest('dest/assets/css'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('dest/assets/css'))
    .pipe(notify({ message: 'Styles task complete' }));
});

gulp.task('scripts', function() {
  return gulp.src('js/*.js')
    .pipe(concat('main.js'))
    .pipe(gulp.dest('dest/assets/js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('dest/assets/js'))
    .pipe(notify({ message: 'Scripts task complete' }));
});

gulp.task('images', function() {
  return gulp.src('images/**/*')
    .pipe(imagemin({ optimizationLevel: 7, progressive: true, interlaced: true }))
    .pipe(gulp.dest('dest/assets/img'))
    .pipe(notify({ message: 'Images task complete' }));
});

gulp.task('clean', function(cb) {
    del(['dest/assets/css', 'dest/assets/js', 'dest/assets/img'], cb)
});

gulp.task('default', ['clean'], function() {
    gulp.start('styles', 'scripts', 'images');
});

gulp.task('watch', function() {

  // Watch .scss files
  gulp.watch('scss/**/*.scss', ['styles']);

  // Watch .js files
  gulp.watch('js/**/*.js', ['scripts']);

  // Watch image files
  gulp.watch('images/**/*', ['images']);
    
  // Create LiveReload server
  livereload.listen();

  // Watch any files in dist/, reload on change
  gulp.watch(['dest/**']).on('change', livereload.changed);

});