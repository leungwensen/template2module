var template = require('zero-text/template');
var homunculus = require('homunculus');
var lang = require('zero-lang');
var sprintf = require('zero-fmt/sprintf');

// code token from zero/template(old version):
var RE_parser = /([\s'\\])(?!(?:[^{]|\{(?!%))*%\})|(?:\{%(=|#)([\s\S]+?)%\})|(?:(\{%)([\s\S]+?)(%\}))/g;
function replacer(s, p1, p2, p3, p4, p5, p6) {
    if (p1) { // whitespace, quote and backspace in HTML context
        return {
                "\n": "\\n",
                "\r": "\\r",
                "\t": "\\t",
                " ": " "
            }[p1] || "\\" + p1;
    }
    if (p2) { // interpolation: {%=prop%}, or unescaped: {%#prop%}
        p3 = lang.trim(p3);
        if (p2 === "=") {
            return "'+_e(" + p3 + ")+'";
        }
        return "'+(" + p3 + "==null?'':" + p3 + ")+'";
    }
    if (p4 && p5 && p6) { // evaluation two matched tags: {% * %}
        return "';" + lang.trim(p5) + " _s+='";
    }
}
function parse(str) {
    return "var _s = '" +
        str.replace(RE_parser, replacer).replace(/\\n\s*/g, '') + // 要是存在回车符号，会引起多解释一个 #text 对象的 bug
        "';return _s;";

}

module.exports = function (templateString) {
    // REFERENCE: inspired by https://github.com/ziluo/primer-template
    var finalFunc;
    var hash = {
        _e: true,
        _s: true,
        helper: true,
        translate: true,
    };
    var args = [];
    var realArgs = '';
    var formalArgs = '';

    var parsedTemplate = parse(templateString);

    var context = homunculus.getContext('js')
        .parse('function zeroTemplate(){' + parsedTemplate + '}').getChildren()[0];
    var vars = context.getVars();
    var vids = context.getVids();

    lang.each(vars, function (vardecl) {
        var v = vardecl.first().token().content();
        hash[v] = true;
    });

    lang.each(vids, function (vid) {
        var v = vid.token().content();
        if (hash[v]) {
            return;
        }
        hash[v] = true;
        args.push(v);
    });

    try {
        new Function(args, parsedTemplate);
    } catch (e) {
        console.log(sprintf("Could not create a template function: \n%s", templateString));
        throw e;
    }

    if (args.length) {
        realArgs = ('data.' + args.join(',data.'));
        formalArgs = args.join(',');
    }

    finalFunc = sprintf([
        'function(data, helper) {',
            'helper = helper || {};',
            'var _e = helper.escape ? helper.escape : function(s) {',
                'return s;',
            '};',
            'return (function(%s){ %s })(%s);',
        '}'
    ].join(''), formalArgs, parsedTemplate, realArgs);

    return finalFunc;
};
