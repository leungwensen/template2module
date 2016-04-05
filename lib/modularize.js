var MODULE_TEMPLATES = {
    amd: require('./template/amd'),
    commonjs: require('./template/commonjs'),
    esnext: require('./template/esnext'),
    umd: require('./template/umd')
};

var jsBeautify = require('js-beautify').js_beautify;

module.exports = function (data, format) {
    var template = MODULE_TEMPLATES[format] || MODULE_TEMPLATES.umd;
    return jsBeautify(template(data));
};

