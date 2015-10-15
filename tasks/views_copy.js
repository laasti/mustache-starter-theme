module.exports = function (gulp, plugins, opts) {
    return function () {
        return gulp.src(opts.views.baseDir+opts.views.glob).pipe(gulp.dest(opts.compileDir + opts.views.outputDir));
    };
};