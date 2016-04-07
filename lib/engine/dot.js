var Engine = require('./base');
var lang = require('zero-lang');
var sprintf = require('zero-fmt/sprintf');
var doT = require('dot');

module.exports = new Engine({
    name: 'dot',
    varname: 'it',
    // the difference between zero and zero-old: if variables starting with `data.` or not.
    outerScopeVars: {
        it: true,
        helper: true,
        out: true
    },
    outerScopeWrapper: require('../template/wrapper/dot'),

    parse: function (str, filePath, config) {
        var me = this;
        var functionBody = doT.template(str, config.c, config.def).toString()
            .replace('\n/**/', '')
            .replace(/^function\ anonymous\(it\)\ \{/, '')
            .replace(/\}$/, '');
        return lang.extend({
            functionBody: functionBody
        }, me.generateArguments(functionBody));
    }
});
