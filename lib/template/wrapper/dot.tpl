function (<%= varname %>) {
    <%= varname %> = <%= varname %> || {};

    return (function (<%= formalArguments %>) {
        <%= functionBody %>
    })(<%= realArguments %>);
}

