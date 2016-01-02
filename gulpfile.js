'use strict';

var gulp = require("gulp"),
    browserSync = require("browser-sync").create(),
    jade = require('gulp-jade'),
    compass = require('gulp-compass'),
    plumber = require('gulp-plumber');
    //sass = require('gulp-sass');

gulp.task('server', function () {
    browserSync.init({
        port: 9000,
        server: {
            baseDir: 'app'
        }
    });
});

gulp.task('sass', function () {
    gulp.src('app/sass/main.scss')
        .pipe(plumber())
        .pipe(compass({
            config_file: 'config.rb',
            css: 'app/css',
            sass: 'app/sass',
            image: 'app/img',
            sourcemap: false
        }));
        //.pipe(sass({
        //    loadPath: [
        //        '/app/bower/support-for/sass',
        //        '/app/bower/normalize.scss/sass'
        //    ]
        //}).on('error', sass.logError))
        //.pipe(gulp.dest('app/css'));
});

gulp.task('jade', function() {
    var YOUR_LOCALS = {};

    gulp.src('app/jade/*.jade')
        .pipe(plumber())
        .pipe(jade({
            locals: YOUR_LOCALS,
            pretty: true
        }))
        .pipe(gulp.dest('app/'))
});

gulp.task('watch', function () {
    gulp.watch('app/sass/**/*.scss', ['sass']);
    gulp.watch('app/jade/index.jade', ['jade']);
    gulp.watch([
        'app/*.html',
        'app/js/*.js',
        'app/css/*.css'
    ]).on('change', browserSync.reload);
    //gulp.watch('bower.json', ['bower']);
});

gulp.task('default', ['server', 'watch']);
