<% var __escaping = false;
   if (functionBody.match(/_\.escape\(/)) {
       functionBody = functionBody.replace(/_\.escape\(/g, '__e(');
       __escaping = true;
   }
%>function (data, helper) {
    data = data || {};
    helper = helper || {};

    var __t;
    var __p='';
    var __j=Array.prototype.join;
    var print=function(){
        __p += __j.call(arguments, '');
    };<% if (__escaping) { %>
    var __e=function(s){
        return String(s).replace(/[&<>"'\/]/g, function (s) {
          return {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': '&quot;',
            "'": '&#39;',
            "/": '&#x2F;'
          }[s];
        });
    };<% } %>

    return (function (<%= formalArguments %>) {
        <%= functionBody %>
    })(<%= realArguments %>);
}