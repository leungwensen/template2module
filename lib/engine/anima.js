var Engine = require('./base');
var json = require('zero-encoding/json');
var sprintf = require('zero-fmt/sprintf');
var preParse = require('primer-template/src/preParse');

module.exports = new Engine({
    name: 'anima',
    // the difference between zero and zero-old: if variables starting with `data.` or not.
    outerScopeVars: {
        helper: true,
        include: true,
        out: true
    },
    outerScopeWrapper: require('../template/wrapper/anima'),
    parse: function (str, filePath) {
        return json.parse(preParse(str, filePath)).formatTpl;
    }
});
