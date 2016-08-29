function (data, helper) {
    data = data || {};
    helper = helper || {};

    return (function (<%= formalArguments %>) {
        <%= functionBody %>
    })(<%= realArguments %>);
}

