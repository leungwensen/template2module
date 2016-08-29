var gulp = require('gulp');
var path = require('path');

// TODO tobe modified

gulp.task('tpl', function () {
    return gulp.src([
        path.resolve(__dirname, '../lib/template/**/*.html'),
        path.resolve(__dirname, '../lib/template/**/*.ztpl')
    ])
        .pipe(compileTemplate({
            template: 'commonjs'
        }))
        .pipe(gulp.dest(path.resolve(__dirname, '../lib/template/')));
});
