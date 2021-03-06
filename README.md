# template2module

precompile templates into modules, built for high performance


## [template2module vs underscore(jsperf)](http://jsperf.com/template2module-vs-underscore-templating)

![template2module-vs-underscore](./assets/jsperf-template2module-vs-underscore.png)


## install

```shell
# global
$ npm install template2module -g
# local
$ npm install template2module --save-dev
```


## usage

### command line interface

```shell
$ template2module \
     --engine(-e) <[underscore/dot/micro/anima]> \
     --format(-f) <[amd/commonjs/esnext/umd]> \
     --config(-c) <$path/to/config/file.js(.json)> \
     $path/to/source/file
```

### api interface

```javascript
var tpl2mod = require('template2module');

// render a underscore template into a module
var underscoreEngine = tpl2mod.engines.underscore;
underscoreEngine.render(
    templateStr,  /* template string */
    moduleName,   /* name of the target module */
    moduleFormat, /* can be one of [amd|commonjs|esnext|umd] or a template render function */
    filePath,     /* engines that support `include` functionality might need it */
    config        /* configuration for the engine */
);
```

### customize

in case you need to render your template into a module that is in `commonjs` format, and it has got some extra dependencies(`zero-lang`, `zero-text`, etc.), and you do not want to pass the `helper` object as one of the arguments every time you use the module.

```javascript
var tpl2mod = require('template2module');
var templateEngine = require('your-template-engine');
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
        return {
            functionBody: sprintf(
                "var _s = '%s'; return _s;",
                templateEngine.parse(str)
            )
        };
    },

    render: function(str, moduleName) {
        // target moduleFormat is 'commonjs' only
        var resultStr = Engine.prototype.render.call(this, str, moduleName, 'commonjs');
        // add extra dependencies in the rendered function
        return [
            'var lang = require("zero-lang");',
            'var i18n = require("zero-locale");',
            'var translate = i18n.translate;',
            ''
        ].join('\n') + resultStr;
    }
});

myAwesomeEngine.render(templateStr, moduleName);
```

If you are using one of the supported engines, it would be much easier:

```javascript
var tpl2mod = require('template2module');
var underscoreEngine = tpl2mod.engines.underscore;
var Engine = tpl2mod.Engine;

underscoreEngine.outerScopeVars.translate = true; // your extra helper function

underscoreEngine.render = function(str, moduleName) {
    // target moduleFormat is 'commonjs' only
    var resultStr = Engine.prototype.render.call(this, str, moduleName, 'commonjs');

    // add extra dependencies in the rendered function
    return [
        'var lang = require("zero-lang");',
        'var i18n = require("zero-locale");',
        'var translate = i18n.translate;',
        ''
    ].join('\n') + resultStr;
};

underscoreEngine.render(templateStr, moduleName);
```


## design

### module structure

```javascript
// wrapping in amd/commonjs/esnext/umd format

    function outerFunction(data, helper) {
        // initializing

        return (function innerFunction(arg1, arg2, .../* formal arguments */) {
            // inner function body

        })(data.arg1, data.arg2, .../* real arguments */);
    }
```

### transform flow

![transform flow](./assets/transform-flow.png)


## supported template engines

- [x] anima: [animajs/template](http://gitlab.alibaba-inc.com/animajs/template)
- [x] dot: [doT.js](https://github.com/olado/doT)
- [x] micro: [Microtemplating](http://ejohn.org/blog/javascript-micro-templating)
- [x] nano: [trix/nano](https://github.com/trix/nano)
- [x] underscore: [Underscore templates](http://underscorejs.org/#template)

and **defining your own engine is SUPER EASY**


## supported modular formats

- [x] [amd](https://github.com/amdjs/amdjs-api/blob/master/AMD.md)
- [x] [commonjs](http://www.commonjs.org/)
- [x] [esnext](https://github.com/tc39/ecma262)
- [x] [umd](https://github.com/umdjs/umd)


## what's next

- [ ] use a move powerful AST analyzer ([substack/node-falafel](https://github.com/substack/node-falafel), etc.), to support more engines
- [ ] support more engines(pug, nunjucks, handlebar, jsrender, mustache, etc.)
- [ ] optimize module after rendered ([google/closure-compiler](https://github.com/google/closure-compiler), etc.)
- [ ] a friendly API interface
- [ ] toolkits: gulp task, webpack loader, grunt task, etc.

