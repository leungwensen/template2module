var fs = require('fs');
var path = require('path');
var data = {
        name: "Foo",
        f1: 1,
        f2: 2,
        f3: 3,
        altEmail: "conditional works",
        farray: [
            {
                farray: [1, 2, 3, [11, 22, 33]],
                person: {name: 'Ell', age: 23}
            },
            {
                farray: {how: 'really'}
            },
            {
                farray: [5, 6, 7, 8]
            }
        ]
    };

var defs = {
    a: 100,
    b: 200
};

defs.loadfile = function (pathname) {
    return fs.readFileSync(path.resolve(__dirname, pathname));
};
defs.externalsnippet = defs.loadfile('./snippet.txt');

module.exports = {
    def: defs
};
