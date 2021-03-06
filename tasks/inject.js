module.exports = function (gulp, plugins, opts) {
    return function () {
        var compile_folder = opts.compileDir,
                assets_folder = opts.compileDir + opts.assetsDir,
                css_inject = function (filepath, file, i, length) {
                    return '<link rel="stylesheet" href="' + '{{{ assetsUrl }}}'+filepath + '" />';
                },
                js_inject = function (filepath, file, i, length) {
                    return '<script type="text/javascript" src="' + '{{{ assetsUrl }}}'+filepath + '"></script>';
                };
        return gulp.src(opts.views.glob, {cwd: compile_folder + opts.views.outputDir})
                .pipe(plugins.inject(gulp.src(opts.inject.js_head.glob, {read: false, cwd: assets_folder, allowEmpty: true}), {name: 'theme-head', quiet: true, transform: js_inject}))
                .pipe(plugins.inject(gulp.src(opts.inject.js.glob, {read: false, cwd: assets_folder, allowEmpty: true}), {name: 'theme', quiet: true, transform: js_inject}))
                .pipe(plugins.inject(gulp.src(opts.inject.css.glob, {read: false, cwd: assets_folder, allowEmpty: true}), {name: 'theme', quiet: true, transform: css_inject}))
                .pipe(gulp.dest(compile_folder + opts.views.outputDir));
    };
};
