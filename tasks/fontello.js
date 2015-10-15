module.exports = function (gulp, plugins, opts) {
    return function () {
        return gulp.src(opts.fontello.baseDir+opts.fontello.glob).pipe(gulp.dest(opts.compileDir + opts.fontello.outputDir));
    };
};