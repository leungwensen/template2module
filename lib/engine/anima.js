var Engine = require('./base');
var lang = require('zero-lang');
var preParse = require('primer-template/src/preParse');

module.exports = new Engine({
    name: 'anima',
    outerScopeVars: {
        helper: true,
        include: true,
        out: true
    },
    outerScopeWrapper: require('../template/wrapper/anima'),
    parse: function (str, filePath) {
        var me = this;
        var functionBody = JSON.parse(preParse(str, filePath)).formatTpl;
        return lang.extend({
            functionBody: functionBody
        }, me.generateArguments(functionBody));
    }
});
