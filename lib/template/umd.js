module.exports = function anonymous(data,helper
/**/) {
data=data||{};helper=helper||{};var _e=helper.escape?helper.escape:function(s){return s;};var _s='(function(root, factory) {if (typeof define === \'function\' && define.amd) {define([], factory);} else if (typeof exports === \'object\') {module.exports = factory();} else {root[\''+(data.name==null?'':data.name)+'\'] = factory();}}(this, function() {\'use strict\';return '+(data.contents==null?'':data.contents)+';}));';return _s;
};