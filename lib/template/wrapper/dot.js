const lang = require('zero-lang');
module.exports = function(data) {
    data = data || {};
    
    var __t;
    var __p = '';
    var __j = Array.prototype.join;
    var print = function() {
        __p += __j.call(arguments, '');
    };
    return (function(varname, formalArguments, functionBody, realArguments) {
        __p += 'function (' +
            ((__t = (varname)) == null ? '' : __t) +
            ') {\n    ' +
            ((__t = (varname)) == null ? '' : __t) +
            ' = ' +
            ((__t = (varname)) == null ? '' : __t) +
            ' || {};\n\n    return (function (' +
            ((__t = (formalArguments)) == null ? '' : __t) +
            ') {\n        ' +
            ((__t = (functionBody)) == null ? '' : __t) +
            '\n    })(' +
            ((__t = (realArguments)) == null ? '' : __t) +
            ');\n}\n\n';;
        return __p;
    })(data.varname, data.formalArguments, data.functionBody, data.realArguments);
};