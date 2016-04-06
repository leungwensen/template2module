# template2module

precompile templates into modules, built for high performance

## install

```shell
# global
$ npm install template2function -g
# local
$ npm install template2function --save-dev
```

## usage

### command line interface

```shell
$ template2module \
     --engine(-e) [zero/underscore/ejs/dot/micro/anima] \
     --format(-f) [amd/commonjs/esnext/umd] \
     $path/to/source/file
```

### api interface

```javascript
var tpl2mod = require('template2module');

// render a zero template into a module
var zeroEngine = tpl2mod.engines.zero;
zeroEngine.render(
    templateStr, /* template string */
    moduleName,  /* name of the target module */
    'umd'        /* can be one of [amd|commonjs|esnext|umd] or a template render function*/
);
```

### customize

in case you need to render your template into a module that is in `commonjs` format, and it has got some extra dependencies(`zero-lang`, `zero-text`, etc.), and you do not want to parse the `helper` object every time you use the module.

```javascript
var tpl2mod = require('template2module');
var templateEngine = require('zero-text/template');
var Engine = tpl2mod.Engine;

var myAwesomeEngine = new Engine({
    outerScopeVars: {
        _e: true,
        _p: true,
        _s: true,
        helper: true,
        translate: true
    },
    outerScopeWrapper: function(data) {
        return [
            'function (data, helper) {',
            '   data = data || {};',
            '   helper = helper || lang;',
            '   var _p = helper.print || function (s) {',
            '       return (s === null || s === undefined) ? '' : s;',
            '   };',
            '   var _e = helper.escape || _p;',
            '   return (function (' + data.formalArguments + ') {',
                    data.functionBody,
            '   })(' + data.realArguments + ');',
            '}'
        ].join('\n');
    },
    
    parse: function (str) {
        return sprintf(
            "var _s = '%s'; return _s;",
            templateEngine .parse(str)
        );
    },
    
    render: function(str, moduleName) {
        // target moduleFormat is 'commonjs' only
        var resultStr = Engine.prototype.render.call(this, str, moduleName, 'commonjs');
        // add extra dependencies in the rendered function
        return [
            'var lang = require("zero-lang");',
            'var i18n = require("zero-text/i18n");',
            'var translate = i18n.translate;',
            ''
        ].join('\n') + resultStr;
    }
});
```

## supported template engines

- [x] zero: [zero-text/template](https://github.com/zero/zero-text/blob/master/template.js) **the default template engine**
- [x] zero-old: [zero/template](http://gitlab.alibaba-inc.com/zeroui/zero/blob/master/src/zero/template.js)
- [ ] underscore: [Underscore templates](http://underscorejs.org/#template)
- [ ] dot: [doT.js](https://github.com/olado/doT)
- [ ] ejs: [EJS](https://github.com/tj/ejs)
- [ ] micro: [Microtemplating](http://ejohn.org/blog/javascript-micro-templating)
- [ ] anima: [animajs/template](http://gitlab.alibaba-inc.com/animajs/template)

## supported modular formats

- [x] [amd](https://github.com/amdjs/amdjs-api/blob/master/AMD.md)
- [x] [commonjs](http://www.commonjs.org/)
- [x] [esnext](https://github.com/tc39/ecma262)
- [x] [umd](https://github.com/umdjs/umd)

