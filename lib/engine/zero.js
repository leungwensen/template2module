var Engine = require('./base');
var jsBeautify = require('js-beautify').js_beautify;
var lang = require('zero-lang');
var sprintf = require('zero-fmt/sprintf');
var zeroTemplate = require('zero-text/template');

module.exports = new Engine({
    name: 'zero',
    // the difference between zero and zero-old: if variables starting with `data.` or not.
    // the new zero template engine do not need a wrapper
    render: function (str, moduleName, moduleFormat) {
        var me = this;

        var resultFunction = zeroTemplate
            .compile(str)
            .toString()
            .replace('\n/**/', '')
            .replace(/^function anonymous/, 'function');
        var moduleTemplate = lang.isFunction(moduleFormat) ?
            moduleFormat : me.moduleTemplates[moduleFormat] || me.moduleTemplates.umd;
        return jsBeautify(moduleTemplate({
            contents: resultFunction,
            name: moduleName
        }));
    }
});
