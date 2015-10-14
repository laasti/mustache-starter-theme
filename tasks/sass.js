module.exports = function (gulp, plugins, opts) {
    return function () {
        var args = plugins.yargs.argv,
            assets_folder = opts.compileDir+opts.assetsDir;
        return plugins.rubySass(opts.sass.glob)
                .pipe(plugins.autoprefixer({browsers: opts.sass.browsers}))
                .on('error', plugins.rubySass.logError)
                .pipe(plugins.if(args.dist, plugins.uglifycss()))
                .pipe(plugins.if(args.dist, concat(opts.sass.concatFilename)))
                .pipe(gulp.dest(assets_folder + opts.sass.outputDir))
                .pipe(plugins.browserSync.reload({stream: true}));
    };
};