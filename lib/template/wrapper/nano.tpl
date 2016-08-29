function (data) {
    data = data || {};
    function _p(s) {
        return (s === null || s === undefined) ? '' : s;
    };

    return (function (<%= formalArguments %>) {
        <%= functionBody %>
    })(<%= realArguments %>);
}
