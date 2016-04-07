var Engine = require('./base');
var lang = require('zero-lang');
var sprintf = require('zero-fmt/sprintf');
var templateEngine = require('zero-text/template');

module.exports = new Engine({
    name: 'zero-old',
    // the difference between zero and zero-old: if variables starting with `data.` or not.
    outerScopeVars: {
        _e: true,
        _p: true,
        _s: true,
        helper: true
    },
    outerScopeWrapper: require('../template/wrapper/zero-old'),
    parse: function (str) {
        var me = this;
        var functionBody = sprintf(
            "var _s = '%s'; return _s;",
            templateEngine.parse(str)
        );
        return lang.extend({
            functionBody: functionBody
        }, me.generateArguments(functionBody));
    }
});
