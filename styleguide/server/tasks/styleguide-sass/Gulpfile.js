'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var configuration = require('./../../setup/configuration.js');

var watchPath = configuration.path.styleguide.app + '/**/*.scss';
var destPath = configuration.path.styleguide.public;

console.log("*********************************");
console.log("***********   TASK   ************");
console.log("******   STYLEGUIDE SASS   ******");
console.log("WATCH PATH:", watchPath);
console.log("DEST  PATH:", destPath);
console.log("*********************************");

gulp.task('sass', function () {
    console.log("WATCH PATH:", watchPath);
    console.log("DEST  PATH:", destPath);
    console.log("*********************************");
    return gulp.src(watchPath)
        .pipe(sass(configuration.sass).on('error', sass.logError))
        .pipe(gulp.dest(destPath));
});

gulp.task('sass:watch', function () {
    console.log("WATCHER");
    console.log("*********************************");
    gulp.watch(watchPath, ['sass']);
});

