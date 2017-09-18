const gulp = require('gulp');
const concat = require('gulp-concat');
const image = require('gulp-image');
const uglify = require('gulp-uglify');
//const obfuscator = require('gulp-javascript-obfuscator');
const cleanCSS = require('gulp-clean-css');
const scripts = require('./scripts');
const styles = require('./styles');
const sourcemaps = require('gulp-sourcemaps');

var devMode = false;

gulp.task('css', function () {
    gulp.src(styles)
        .pipe(concat('bundle.css'))
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(gulp.dest('public/dist/css'));
});

gulp.task('image', function () {
    gulp.src('./client/vendor/img/*')
        .pipe(image())
        .pipe(gulp.dest('public/dist/img'));
});

gulp.task('js', function () {
    gulp.src(scripts)
        .pipe(sourcemaps.init())
        .pipe(concat('bundle.js'))
        .pipe(uglify())
        //.pipe(obfuscator())
        .pipe(gulp.dest('public/dist/js'));
});

gulp.task('fonts', function () {
    return gulp.src([
        './client/vendor/fonts/*'])
        .pipe(gulp.dest('public/dist/fonts'));
});

gulp.task('html', function () {
    return gulp.src('./client/**/*.html')
        .pipe(gulp.dest('public/'));
});

gulp.task('build', function () {
    gulp.start(['css', 'js', 'html', 'image', 'fonts'])
});

gulp.task('start', function () {
    devMode = true;
    gulp.start(['build']);
    gulp.task('default', ['image']);
    gulp.watch(['./client/**/*.css'], ['css']);
    gulp.watch(['./client/**/*.js'], ['js']);
    gulp.watch(['./client/templates/**/*.html'], ['html']);
});