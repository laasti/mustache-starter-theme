module.exports = function (gulp, plugins, opts) {
    return function () {
        return plugins.del(opts.clean.glob, {cwd: opts.compileDir});
    };
};
