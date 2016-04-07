var Engine = require('./base');
var lang = require('zero-lang');
var sprintf = require('zero-fmt/sprintf');

module.exports = new Engine({
    name: 'zero-old',
    // the difference between zero and zero-old: if variables starting with `data.` or not.
    outerScopeVars: {
        helper: true,
        p: true,
        print: true
    },
    outerScopeWrapper: require('../template/wrapper/micro'),
    parse: function (str) {
        var me = this;
        var functionBody = sprintf("p.push('%s'); return p.join('');",
            str
                .replace(/[\r\n\t]/g, "")
                .split("<%").join("\t")
                .replace(/((^|%>)[^\t]*)'/g, function($0, $1) {
                    return $1.replace(/'/g, "\\'") + "\r";
                })
                .replace(/\t=(.*?)%>/g, "',$1,'")
                .split("\t").join("');")
                .split("%>").join("p.push('")
                .split("\r").join("\\'")
        );
        return lang.extend({
            functionBody: functionBody
        }, me.generateArguments(functionBody));
    }
});
