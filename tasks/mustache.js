module.exports = function (gulp, plugins, opts) {
    return function () {
        var compile_folder = opts.compileDir, args = plugins.yargs.argv,
                data = plugins.data(gulp, plugins, opts)(),
                assets_folder = opts.compileDir + opts.assetsDir,
                css_inject = function (filepath, file, i, length) {
                    return '<link rel="stylesheet" href="' + filepath.replace(assets_folder.replace('./', '/'), '{{{ assets_url }}}') + '" />';
                },
                js_inject = function (filepath, file, i, length) {
                    return '<script type="text/javascript" src="' + filepath.replace(assets_folder.replace('./', '/'), '{{{ assets_url }}}') + '"></script>';
                };

        return gulp.src(compile_folder + opts.views.compileGlob)
                .pipe(plugins.mustache(data, {extension: ".html"}))
                .pipe(gulp.dest(compile_folder))
                .pipe(plugins.browserSync.reload({stream: true}));
    };
};