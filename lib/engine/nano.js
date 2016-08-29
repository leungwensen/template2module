var Engine = require('./base');
var lang = require('zero-lang');

module.exports = new Engine({
    name: 'nano',
    outerScopeVars: { // used in me.generateArguments
        _p: true,
        _s: true
    },
    outerScopeWrapper: require('../template/wrapper/nano'),
    parse: function (str, filePath) {
        var me = this;
        var functionBody = "var _s = '" +
            str
                .replace(/\n/g, '')
                .replace(/\{([\w\.]*)\}/g, function (str, key) {
                    return "' + " + key + " + '";
                }) +
            "'; return _s;";
        console.log(functionBody);
        return lang.extend({
            functionBody: functionBody
        }, me.generateArguments(functionBody));
    }
});
