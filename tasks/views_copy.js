module.exports = function (gulp, plugins, opts) {
    return function () {
        var path = './bower_components/altrum-base-theme/dist/views';
        src =  gulp.src(opts.views.glob, {cwd: path, base: path}).pipe(gulp.dest(opts.compileDir + opts.views.outputDir));
        gulp.src(opts.views.glob, {cwd: opts.views.workingDir, base: opts.views.workingDir}).pipe(gulp.dest(opts.compileDir + opts.views.outputDir));
        return src;
    };
};
