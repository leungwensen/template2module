const lang = require('zero-lang');
module.exports = function(data) {
    data = data || {};
    
    var __t;
    var __p = '';
    var __j = Array.prototype.join;
    var print = function() {
        __p += __j.call(arguments, '');
    };

    return (function(contents) {
        __p += 'module.exports = ' +
            ((__t = (contents)) == null ? '' : __t) +
            ';';;
        return __p;
    })(data.contents);
};