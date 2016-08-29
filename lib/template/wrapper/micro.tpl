function (data, helper) {
    data = data || {};
    helper = helper || {};

    var p = [];
    var print = helper.print || function() {
        p.push.apply(p,arguments);
    };

    return (function (<%= formalArguments %>) {
        <%= functionBody %>
    })(<%= realArguments %>);
}

