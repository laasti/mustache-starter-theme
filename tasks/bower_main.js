module.exports = function (gulp, plugins, opts) {
    return function () {
        var bower_files = plugins.bowerFiles().files;
        plugins.del.sync(opts.bower.vendorDir);
        return gulp.src(bower_files.files, {base: opts.bower.installDir})
                .pipe(gulp.dest(opts.bower.vendorDir));
    };
};