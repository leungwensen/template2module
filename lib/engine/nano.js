var Engine = require('./base');
var lang = require('zero-lang');
var sprintf = require('zero-fmt/sprintf');

module.exports = new Engine({
    name: 'nano',
    outerScopeVars: { // used in me.generateArguments
        _p: true,
        _s: true
    },
    outerScopeWrapper: require('../template/wrapper/nano'),
    parse: function (str, filePath) {
        var me = this;
        var functionBody = sprintf(
            "var _s = '%s'; return _s;",
            str
                .replace(/\n/g, '')
                .replace(/\{([\w\.]*)\}/g, function(str, key) {
                    return sprintf("' + %s + '", key);
                })
        );
        console.log(functionBody);
        return lang.extend({
            functionBody: functionBody
        }, me.generateArguments(functionBody));
    }
});
