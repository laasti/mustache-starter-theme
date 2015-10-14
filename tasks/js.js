module.exports = function (gulp, plugins, opts) {
    return function () {
        var args = plugins.yargs.argv,
                assets_folder = opts.compileDir+opts.assetsDir;
        gulp.src(["./src/js/ckeditor/**"]).pipe(gulp.dest(assets_folder + "/js/ckeditor"));
        return gulp.src(opts.js.glob)
               .pipe(plugins.if(args.dist, plugins.uglify()))
               .pipe(plugins.if(args.dist, plugins.concat(opts.js.concatFilename)))
               .pipe(gulp.dest(assets_folder + opts.js.outputDir))
                .pipe(plugins.browserSync.reload({stream: true}));
    };
};