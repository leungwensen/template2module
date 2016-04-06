var Engine = require('./base');
var sprintf = require('zero-fmt/sprintf');
var template = require('zero-text/template');

module.exports = new Engine({
    name: 'zero-old',
    // the difference between zero and zero-old: if variables starting with `data.` or not.
    outerScopeVars: {
        _e: true,
        _p: true,
        _s: true,
        helper: true,
        translate: true
    },
    outerScopeWrapper: require('../template/wrapper/zero-old'),
    parse: function (str) {
        return sprintf(
            "var _s = '%s'; return _s;",
            template.parse(str)
        );
    }
});
