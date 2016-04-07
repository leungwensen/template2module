module.exports = {
    Engine: require('./engine/base'),
    engines: {
        'zero-old': require('./engine/zero-old'),
        anima: require('./engine/anima'),
        micro: require('./engine/micro'),
        underscore: require('./engine/underscore'),
        zero: require('./engine/zero')
    }
};

