module.exports = function anonymous(data,helper
/**/) {
data=data||{};helper=helper||{};var _p=helper.print?helper.print:function(s){return s === null ? '' : s;};var _e=helper.escape?helper.escape:function(s){return _p(s);};var _s='(function(root, factory) {if (typeof define === \'function\' && define.amd) {define([], factory);} else if (typeof exports === \'object\') {module.exports = factory();} else {root[\''+_p(data.name)+'\'] = factory();}}(this, function() {\'use strict\';return '+_p(data.contents)+';}));';return _s;
};