module.exports = function anonymous(data,helper
/**/) {
data=data||{};helper=helper||{};var _p=helper.print?helper.print:function(s){return s === null ? '' : s;};var _e=helper.escape?helper.escape:function(s){return _p(s);};var _s='define(function() {return '+_p(data.contents)+';});';return _s;
};