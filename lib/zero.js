var template = require('zero-text/template');

module.exports = function (templateString) {
    return template
        .compile(templateString) // Got the template function
        .toString()              // Got function string
        .replace('\n/**/', '');  // fixes
};
