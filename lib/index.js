module.exports = {
    Engine: require('./engine/base'),
    engines: {
        'zero-old': require('./engine/zero-old'),
        anima: require('./engine/anima'),
        dot: require('./engine/dot'),
        micro: require('./engine/micro'),
        nano: require('./engine/nano'),
        underscore: require('./engine/underscore'),
        zero: require('./engine/zero')
    }
};

