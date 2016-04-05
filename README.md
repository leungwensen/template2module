# template2function

precompile templates into functions, built for high performance

## install

```shell
# global
$ npm install template2function -g
# local
$ npm install template2function --save-dev
```

## usage

```shell
$ template2function \
     --engine(-e) [zero/underscore/ejs/dot/micro/anima] \
     --format(-f) [amd/commonjs/esnext/umd] \
     $path/to/source/file
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

