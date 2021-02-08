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

var currentPath = process.cwd();


gulp.task('assets', () => {
    return gulp.src(['./src/assets/**/*.*'])
        .pipe(gulp.dest('./dist/public/'));
});

gulp.task('styles', () => {
    return gulp.src(assets.assets.styles).pipe(concat(currentPath + '/dist/public/all.css'))
        .pipe(cleanCSS({
            compatibility: 'ie8'
        }))
        .pipe(gulp.dest('./src/assets/'));
});

gulp.task('scripts', () => {
    return gulp.src(assets.assets.scripts)
        .pipe(concat(currentPath + '/dist/public/all.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./src/assets/'));
});

gulp.task('html', () => {
    return gulp.src("./src/pages/*.ejs")
        .pipe(ejs({
            msg: 'Hello Gulp!'
        }, {}, {
            ext: '.html'
        }))
        .pipe(htmlbeautify())
        .pipe(gulp.dest('./dist'));
});


gulp.task('server', (done) => {
    nodemon({
        script: 'index.js',
        ext: 'js html',
        env: {
            'NODE_ENV': 'development'
        },
        done: done
    })
});


gulp.task('default', gulp.parallel('assets', 'styles', 'scripts', 'server'));

gulp.task('build', gulp.parallel('assets', 'styles', 'scripts', 'html'));

gulp.watch('./src/assets/**/*.css', gulp.parallel('styles'));
gulp.watch('./src/assets/**/*.js', gulp.parallel('scripts'));