var Engine = require('./base');
var lang = require('zero-lang');
var _ = require('underscore');

module.exports = new Engine({
    name: 'underscore',
    outerScopeVars: {
        _: true,
        __e: true,
        __j: true,
        __p: true,
        __t: true,
        helper: true
    },
    outerScopeWrapper: require('../template/wrapper/underscore'),
    parse: function (str) {
        var me = this;
        var functionBody = _.template(str).source // function body got
                .replace('function(obj){\n', '') // removing start point of wrapping function
                .replace("var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n", '')
                .replace('with(obj||{}){\n', '') // removing start point of `with`
                .replace(/}$/, '') // removing end point of wrapping function
                .replace(/}\nreturn\s+__p\;\n$/, '') // removing end point of `with` and return statement
            + '; return __p;';
        return lang.extend({
            functionBody: functionBody
        }, me.generateArguments(functionBody));
    }
});
