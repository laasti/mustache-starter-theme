module.exports = function (gulp, plugins, opts) {
    return function () {
        var assets_folder = opts.compileDir+opts.assetsDir;
        return gulp.src(opts.fontello.glob, {cwd: opts.fontello.workingDir}).pipe(gulp.dest(assets_folder + opts.fontello.outputDir));
    };
};