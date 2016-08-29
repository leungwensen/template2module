module.exports = {
    Engine: require('./engine/base'),
    engines: {
        anima: require('./engine/anima'),
        dot: require('./engine/dot'),
        micro: require('./engine/micro'),
        nano: require('./engine/nano'),
        underscore: require('./engine/underscore'),
    }
};

