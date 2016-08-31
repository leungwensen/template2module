const lang = require('zero-lang');
module.exports = function(data) {
    data = data || {};
    
    var __t;
    var __p = '';
    var __j = Array.prototype.join;
    var print = function() {
        __p += __j.call(arguments, '');
    };

    return (function(functionBody, formalArguments, realArguments) {
        __p += '';
        var __escaping = false;
        if (functionBody.match(/_\.escape\(/)) {
            functionBody = functionBody.replace(/_\.escape\(/g, '__e(');
            __escaping = true;
        }

        __p += 'function (data, helper) {\n    data = data || {};\n    helper = helper || {};\n\n    var __t;\n    var __p=\'\';\n    var __j=Array.prototype.join;\n    var print=function(){\n        __p += __j.call(arguments, \'\');\n    };';
        if (__escaping) {
            __p += '\n    var __e=function(s){\n        return String(s).replace(/[&<>"\'\\/]/g, function (s) {\n          return {\n            "&": "&amp;",\n            "<": "&lt;",\n            ">": "&gt;",\n            \'"\': \'&quot;\',\n            "\'": \'&#39;\',\n            "/": \'&#x2F;\'\n          }[s];\n        });\n    };';
        }
        __p += '\n\n    return (function (' +
            ((__t = (formalArguments)) == null ? '' : __t) +
            ') {\n        ' +
            ((__t = (functionBody)) == null ? '' : __t) +
            '\n    })(' +
            ((__t = (realArguments)) == null ? '' : __t) +
            ');\n}';;
        return __p;
    })(data.functionBody, data.formalArguments, data.realArguments);
};