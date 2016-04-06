#!/usr/bin/env node

var commander = require('commander');
var path = require('path');
var fs = require('fs');
var sprintf = require('zero-fmt/sprintf');
var zeroTemplate = require('zero-text/template');

var engines = require('../lib').engines;

var pkg = require(path.resolve(__dirname, '../package.json'));

commander
    .version(pkg.version)
    .description('precompile templates into functions, built for high performance')
    .option('-e, --engine <engine>', 'choose a template engine, default value is "zero"')
    .option('-f, --format <format>', 'the result module format, default is "umd"')
    .arguments('<source>')
    .action(function (source) {
        if (!source) {
            throw new Error('Please specify a template file!')
        }
        var engine = commander.engine || 'zero';
        var moduleFormat = commander.format || 'umd';
        if (!engines[engine]) {
            throw new Error(sprintf('Engine %s is not available!', engine));
        }
        fs.readFile(source, {
            encoding: 'utf8'
        }, function (err, data) {
            if (err) {
                throw err;
            } else {
                var resultFunc = engines[engine].render(
                    data, // origin template string
                    path.basename(source, path.extname(source)), // module name
                    moduleFormat // module format
                );
                console.log(resultFunc);
            }
        });
    });

commander.parse(process.argv);

if (process.argv.length === 2) {
    commander.outputHelp();
}

