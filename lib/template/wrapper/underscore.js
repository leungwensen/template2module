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
        __p += 'function (data, helper) {\n    data = data || {};\n    helper = helper || {};\n\n    var __t;\n    var __p=\'\';\n    var __j=Array.prototype.join;\n    var print=function(){\n        __p += __j.call(arguments, \'\');\n    };\n\n    return (function (' +
            ((__t = (formalArguments)) == null ? '' : __t) +
            ') {\n        ' +
            ((__t = (functionBody)) == null ? '' : __t) +
            '\n    })(' +
            ((__t = (realArguments)) == null ? '' : __t) +
            ');\n}';;
        return __p;
    })(data.formalArguments, data.functionBody, data.realArguments);
}

;