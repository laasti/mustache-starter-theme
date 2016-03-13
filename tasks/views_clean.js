module.exports = function (gulp, plugins, opts) {
    return function () {
        return plugins.del('.'+opts.views.outputDir, {cwd: opts.compileDir});
    };
};