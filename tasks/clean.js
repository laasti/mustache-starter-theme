module.exports = function (gulp, plugins, opts) {
    return function () {
        console.log(opts.compileDir);
        console.log(opts.clean);
        return gulp.src(opts.clean.glob, {cwd: opts.compileDir});
        return plugins.del(opts.clean.glob, {root: opts.compileDir});
    };
};