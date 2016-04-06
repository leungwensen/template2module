var declare = require('zero-oop/declare');
var homunculus = require('homunculus');
var jsBeautify = require('js-beautify').js_beautify;
var lang = require('zero-lang');
var sprintf = require('zero-fmt/sprintf');

var Engine = declare({
    constructor: function (options) {
        return lang.extend(this, options);
    },

    moduleTemplates: {
        amd: require('../template/module/amd'),
        commonjs: require('../template/module/commonjs'),
        esnext: require('../template/module/esnext'),
        umd: require('../template/module/umd')
    },

    name: 'my-awesome-template-engine',
    outerScopeVars: { // used in me.generateArguments
        _s: true
    },

    outerScopeWrapper: function (data) {
        return [
            'function (data, helper) {',
            '// initializing',
            'return (function (' + data.formalArguments + ') {',
            data.functionBody,
            '})(' + data.realArguments + ');',
            '}'
        ].join('\n');
    },

    parse: function (str) {
        // NOTICE: override this function to parse template into function body
        return sprintf('var _s = "%s";', str.replace(/"/g, '\"'));
    },

    generateArguments: function (functionBody) {
        // REFERENCE: inspired by https://github.com/ziluo/primer-template
        var me = this;
        var hash = lang.extend({}, me.outerScopeVars);
        var args = [];
        var realArgs = '';
        var formalArgs = '';

        var context = homunculus.getContext('js')
            .parse(sprintf('function template(){ %s }', functionBody))
            .getChildren()[0];
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
            new Function(args, functionBody);
        } catch (e) {
            console.log(sprintf("Could not create a template function: \n%s", functionBody));
            throw e;
        }

        if (args.length) {
            realArgs = ('data.' + args.join(',data.'));
            formalArgs = args.join(',');
        }
        return {
            formalArguments: formalArgs,
            realArguments: realArgs
        };
    },

    render: function (str, moduleName, moduleFormat/* you can parse a render function here */) {
        var me = this;

        // get data.functionBody
        var functionBody = me.parse(str);

        // get data.formalArguments & data.realArguments
        var data = lang.extend({
            functionBody: functionBody
        }, me.generateArguments(functionBody));

        // generate the result function
        var resultFunction = me.outerScopeWrapper(data);

        // specify a module format
        var template = lang.isFunction(moduleFormat) ?
            moduleFormat : me.moduleTemplates[moduleFormat] || me.moduleTemplates.umd;

        // generate the result module and beautify it
        return jsBeautify(template({
            contents: resultFunction,
            name: moduleName
        }));
    }
});

module.exports = Engine;
