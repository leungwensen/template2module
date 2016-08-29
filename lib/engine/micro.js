var Engine = require('./base');
var lang = require('zero-lang');

module.exports = new Engine({
    name: 'zero-old',
    outerScopeVars: {
        helper: true,
        p: true,
        print: true
    },
    outerScopeWrapper: require('../template/wrapper/micro'),
    parse: function (str) {
        var me = this;
        var functionBody = "p.push('" +
            str
                .replace(/[\r\n\t]/g, "")
                .split("<%").join("\t")
                .replace(/((^|%>)[^\t]*)'/g, function ($0, $1) {
                    return $1.replace(/'/g, "\\'") + "\r";
                })
                .replace(/\t=(.*?)%>/g, "',$1,'")
                .split("\t").join("');")
                .split("%>").join("p.push('")
                .split("\r").join("\\'") +
            "'); return p.join('');";
        return lang.extend({
            functionBody: functionBody
        }, me.generateArguments(functionBody));
    }
});
