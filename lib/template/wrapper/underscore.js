module.exports = function anonymous(data,helper
/**/) {
data=data||{};helper=helper||{};var _p=helper.print?helper.print:function(s){return s === null ? '' : s;};var _e=helper.escape?helper.escape:function(s){return _p(s);};var _s='function (data, helper) {data = data || {};helper = helper || {};var __t;var __p=\'\';var __j=Array.prototype.join;var print=function(){__p += __j.call(arguments, \'\');};return (function ('+_e(data.formalArguments)+') {'+_e(data.functionBody)+'})('+_e(data.realArguments)+');}';return _s;
};