module.exports = function (gulp, plugins, opts) {
    return function () {
        var args = plugins.yargs.argv;
        if (args.compileDir) {
			return args.compileDir;
		} 
        for (var i in opts.compileDirs) {
            if (args[i]) {
                return opts.compileDirs[i];
            }
        }
        
        return opts.compileDirs.public;
    };
};