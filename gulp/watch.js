var gulp = require('gulp');
var path = require('path');
var watch = require('gulp-watch');

gulp.task('watch', function () {
    watch([
        path.resolve(__dirname, '../lib/template/**/*.html'),
        path.resolve(__dirname, '../lib/template/**/*.ztpl')
    ], function () {
        gulp.start('template');
    });
});

