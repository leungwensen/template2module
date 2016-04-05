var template = require('zero-text/template');

module.exports = function (templateString) {
    return template
        .compile(templateString)
        .toString()
        .replace('\n/**/', '')
        .replace('function anonymous(data,helper) {', 'function(data,helper){');
};
