const lang = require('zero-lang');
module.exports = function(data) {
    data = data || {};
    

    var __t;
    var __p = '';
    var __j = Array.prototype.join;
    var print = function() {
        __p += __j.call(arguments, '');
    };

    return (function(formalArguments, functionBody, realArguments) {
        __p += 'function (data) {\n    data = data || {};\n    function _p(s) {\n        return (s === null || s === undefined) ? \'\' : s;\n    };\n\n    return (function (' +
            ((__t = (formalArguments)) == null ? '' : __t) +
            ') {\n        ' +
            ((__t = (functionBody)) == null ? '' : __t) +
            '\n    })(' +
            ((__t = (realArguments)) == null ? '' : __t) +
            ');\n}\n';;
        return __p;
    })(data.formalArguments, data.functionBody, data.realArguments);
}

;