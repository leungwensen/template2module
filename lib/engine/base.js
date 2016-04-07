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
    varname: 'data',
    outerScopeVars: { // used in me.generateArguments
        _s: true,
        helper: true
    },

    outerScopeWrapper: function (data) {
        var me = this;
        return [
            'function (' + me.varname + ', helper) {',
            '    // initializing',
            '    data = data || {};',
            '    return (function (' + data.formalArguments + ') {',
            '        ' + data.functionBody,
            '    })(' + data.realArguments + ');',
            '}'
        ].join('\n');
    },

    parse: function (str/*, filePath, config*/) {
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
            realArgs = (me.varname + '.' + args.join(',' + me.varname + '.'));
            formalArgs = args.join(',');
        }
        return {
            formalArguments: formalArgs,
            realArguments: realArgs
        };
    },

    wrap: function (functionBody) {
        var me = this;
        // get data.formalArguments & data.realArguments
        var data = lang.extend({
            varname: me.varname,
            functionBody: functionBody
        }, me.generateArguments(functionBody));

        // generate the result function
        return me.outerScopeWrapper(data);
    },

    modularize: function (outerScopeFunction, moduleName, moduleFormat/* you can parse a render function here */) {
        var me = this;

        // specify a module format
        var template = lang.isFunction(moduleFormat) ?
            moduleFormat : me.moduleTemplates[moduleFormat] || me.moduleTemplates.umd;

        // generate the result module and beautify it
        return template({
            contents: outerScopeFunction,
            name: moduleName
        });
    },

    beautify: function (module) {
        return jsBeautify(module);
    },

    render: function (str, moduleName, moduleFormat/* you can parse a render function here */, filePath, config) {
        var me = this;
        // string to js code
        var innerFunctionBody = me.parse(str, filePath, config);
        // wrapping into a result function
        var outerFunction = me.wrap(innerFunctionBody);
        // modularizing
        var module = me.modularize(outerFunction, moduleName, moduleFormat);
        // beautifying
        return me.beautify(module);
    }
});

module.exports = Engine;
