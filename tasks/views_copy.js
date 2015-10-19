module.exports = function (gulp, plugins, opts) {
    return function () {
        return gulp.src(opts.views.glob, {cmw: opts.views.workingDir}).pipe(gulp.dest(opts.compileDir + opts.views.outputDir));
    };
};