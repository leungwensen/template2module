var gulp = require('gulp');
var compileTemplate = require('gulp-ztpl-compiler');
var path = require('path');

gulp.task('ztpl', function () {
    return gulp.src([
            path.resolve(__dirname, '../lib/template/**/*.html'),
            path.resolve(__dirname, '../lib/template/**/*.ztpl')
        ])
        .pipe(compileTemplate({
            template: 'commonjs'
        }))
        .pipe(gulp.dest(path.resolve(__dirname, '../lib/template/')));
});
