const lang = require('zero-lang');
module.exports = function(data) {
    data = data || {};
    
    var __t;
    var __p = '';
    var __j = Array.prototype.join;
    var print = function() {
        __p += __j.call(arguments, '');
    };
    return (function(name, contents) {
        __p += '(function(root, factory) {\n  if (typeof define === \'function\' && define.amd) {\n    define([], factory);\n  } else if (typeof exports === \'object\') {\n    module.exports = factory();\n  } else {\n    root[\'' +
            ((__t = (name)) == null ? '' : __t) +
            '\'] = factory();\n  }\n}(this, function() {\n  \'use strict\';\n  return ' +
            ((__t = (contents)) == null ? '' : __t) +
            ';\n}));';;
        return __p;
    })(data.name, data.contents);
};