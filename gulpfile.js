const gulp = require('gulp');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const image = require('gulp-image');
const uglify = require('gulp-uglify');
const obfuscator = require('gulp-javascript-obfuscator');
const cleanCSS = require('gulp-clean-css');
const scripts = require('./scripts');
const styles = require('./styles');

// Some pointless comments for our project.

var devMode = false;

gulp.task('css', function () {
    gulp.src(styles)
        .pipe(concat('bundle.css'))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('public/dist/css'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('image', function () {
    gulp.src('./client/vendor/img/*')
        .pipe(image())
        .pipe(gulp.dest('public/dist/img'));
});

gulp.task('js', function () {
    gulp.src(scripts)
        .pipe(concat('bundle.js'))
        .pipe(uglify())
        //.pipe(obfuscator())
        .pipe(gulp.dest('public/dist/js'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('html', function () {
    return gulp.src('./client/**/*.html')
        .pipe(gulp.dest('public/'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('build', function () {
    gulp.start(['css', 'js', 'html', 'image'])
});

gulp.task('browser-sync', function () {
    browserSync.init(null, {
        open: false,
        server: {
            baseDir: 'dist',
        }
    });
});

gulp.task('start', function () {
    devMode = true;
    gulp.start(['build', 'browser-sync']);
    gulp.task('default', ['image']);
    gulp.watch(['./client/**/*.css'], ['css']);
    gulp.watch(['./client/**/*.js'], ['js']);
    gulp.watch(['./client/templates/**/*.html'], ['html']);
});