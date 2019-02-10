const gulp = require('gulp'),
    ejs = require("gulp-ejs"),
    concat = require('gulp-concat'),
    nodemon = require('gulp-nodemon');

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

gulp.task('serve', function (done) {
    nodemon({
        script: 'app.js',
        ext: 'js html',
        env: { 'NODE_ENV': 'development' },
        done: done
    })
});

gulp.task('default', ['serve', 'allCss']);

gulp.task('build', ['build', 'allCss', 'assets']);

gulp.watch('./src/assets/**/*.css', ['allCss']);