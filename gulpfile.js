const assets = require('./assets');
// console.log(assets);
const gulp = require('gulp'),
    ejs = require("gulp-ejs"),
    concat = require('gulp-concat'),
    nodemon = require('gulp-nodemon'),
    cleanCSS = require('gulp-clean-css'),
    // minify = require('gulp-minify'),
    uglify = require('gulp-uglify'),
    htmlbeautify = require('gulp-html-beautify');

gulp.task('assets', function() {
    return gulp.src(['./src/assets/**/*.*'])
    .pipe(gulp.dest('./dist/public/'));
});

gulp.task('buildHtml', function() {
    return gulp.src("./src/pages/*.ejs")
    .pipe(ejs({ msg: 'Hello Gulp!'}, {}, { ext: '.html' }))
    .pipe(htmlbeautify())
    .pipe(gulp.dest('./dist'));
});


gulp.task('allCss', function() {
    return gulp.src(assets.assets.styles).pipe(concat('all.css'))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('./src/assets/'));
});

gulp.task('allJs', function() {
    return gulp.src(assets.assets.scripts)
    .pipe(concat('all.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./src/assets/'));
});

gulp.task('serve', function (done) {
    nodemon({
        script: 'app.js',
        ext: 'js html',
        env: { 'NODE_ENV': 'development' },
        done: done
    })
});

gulp.task('default', ['serve', 'allCss', 'allJs']);

gulp.task('build', ['buildHtml', 'allCss', 'allJs', 'assets']);

gulp.watch('./src/assets/**/*.css', ['allCss']);
gulp.watch('./src/assets/**/*.js', ['allJs']);