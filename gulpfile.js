const gulp = require('gulp'),
    ejs = require("gulp-ejs"),
    concat = require('gulp-concat');
// var gulpEjs = require('gulp-ejs-template');

// var gulpCopy = require('gulp-copy');
// var otherGulpFunction = require('gulp-other-function');
 

gulp.task('assets', function() {
    return gulp.src(['./src/assets/**/*'])
    .pipe(gulp.dest('./dist/public/'));
});

gulp.task('build', function() {
    return gulp.src("./src/pages/*.ejs")
    .pipe(ejs({ msg: 'Hello Gulp!'}, {}, { ext: '.html' }))
    .pipe(gulp.dest('./dist'))
});


gulp.task('allCss', function() {
    return gulp.src([
        './src/assets/css/index.css'
    ]).pipe(concat('all.css'))
    .pipe(gulp.dest('./src/assets/'));
});


gulp.task('default', ['build', 'allCss', 'assets']);