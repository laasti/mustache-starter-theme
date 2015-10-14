module.exports = function (gulp, plugins, opts) {
    return function () {
        var args = plugins.yargs.argv;
        
        for (var i in opts) {
            if (args[i]) {
                return opts[i];
            }
        }
        
        return opts.public;
    };
};