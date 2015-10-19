module.exports = function (gulp, plugins, opts) {
    return function () {
        var args = plugins.yargs.argv,
            assets_folder = opts.compileDir+opts.assetsDir;
        return gulp.src(opts.images.glob, {cwd: opts.images.workingDir}).pipe(gulp.dest(assets_folder + opts.images.outputDir))
                .pipe(plugins.browserSync.reload({stream: true}));
    };
};