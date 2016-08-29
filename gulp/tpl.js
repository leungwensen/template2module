var gulp = require('gulp');
var gutil = require('gulp-util');
var rename = require('gulp-rename');
var through = require('through2');
var path = require('path');
var tpl2mod = require('../lib/index');

var underscoreEngine = tpl2mod.engines.underscore;
underscoreEngine.outerScopeVars.JSON = true;
underscoreEngine.outerScopeVars.lang = true;

function renderTemplates() {
    return through.obj(function render(file, enc, cb) {
        if (file.isNull()) {
            this.push(file);
            return cb();
        }
        if (file.isStream()) this.emit('error', new gutil.PluginError('template2module', 'Streaming not supported'));

        try {
            gutil.log(file.path);
            var templateContent = file.contents.toString('utf8')
                .replace(/>[\s|\r|\n]*</g, '><');
            var content = underscoreEngine.render(templateContent, file.path, 'commonjs')
                .replace(', helper', '')
                .replace('helper = helper || {};', '');
            file.contents = new Buffer('const lang = require(\'zero-lang\');\n' + content);
        } catch (err) {
            this.emit('error', new gutil.PluginError('template2module', err.toString()));
        }

        this.push(file);
        return cb();
    });
}

gulp.task('tpl', function () {
    return gulp.src([
        path.resolve(__dirname, '../lib/template/**/*.html'),
        path.resolve(__dirname, '../lib/template/**/*.tpl')
    ])
        .pipe(renderTemplates())
        .pipe(rename(function (pathname) {
            pathname.extname = '.js';
        }))
        .pipe(gulp.dest(path.resolve(__dirname, '../lib/template/')));
});
