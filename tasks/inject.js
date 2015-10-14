module.exports = function (gulp, plugins, opts) {
    return function () {
        var compile_folder = opts.compileDir, args = plugins.yargs.argv,
                assets_folder = opts.compileDir + opts.assetsDir,
                css_inject = function (filepath, file, i, length) {
                    return '<link rel="stylesheet" href="' + filepath.replace(assets_folder.replace('./', '/'), '{{{ assets_url }}}') + '" />';
                },
                js_inject = function (filepath, file, i, length) {
                    return '<script type="text/javascript" src="' + filepath.replace(assets_folder.replace('./', '/'), '{{{ assets_url }}}') + '"></script>';
                };


        return gulp.src(compile_folder + opts.views.glob)
                .pipe(plugins.inject(gulp.src(opts.inject.js_head.glob, {read: false, base: assets_folder}), {name: 'theme-head', transform: js_inject}))
                .pipe(plugins.inject(gulp.src(opts.inject.js.glob, {read: false, base: assets_folder}), {name: 'theme', transform: js_inject}))
                .pipe(plugins.inject(gulp.src(opts.inject.css.glob, {read: false, base: assets_folder}), {name: 'theme', transform: css_inject}))
                .pipe(gulp.dest(compile_folder + opts.views.outputDir));
    };
};