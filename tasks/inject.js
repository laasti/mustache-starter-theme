module.exports = function (gulp, plugins, opts) {
    return function () {
        var compile_folder = opts.compileDir,
                assets_folder = opts.compileDir + opts.assetsDir,
                css_inject = function (filepath, file, i, length) {
                    return '<link rel="stylesheet" href="' + filepath.replace(assets_folder.replace('./', '/'), '{{{ assets_url }}}') + '" />';
                },
                js_inject = function (filepath, file, i, length) {
                    return '<script type="text/javascript" src="' + filepath.replace(assets_folder.replace('./', '/'), '{{{ assets_url }}}') + '"></script>';
                };

        return gulp.src(opts.views.glob, {cwd: compile_folder + opts.views.outputDir})
                //.pipe(plugins.inject(gulp.src(assets_folder+opts.inject.css.glob, {read: false}), {name: 'theme', transform: css_inject}))
                //.pipe(plugins.inject(gulp.src(assets_folder+opts.inject.js.glob, {read: false}), {name: 'theme', transform: js_inject}))
                //.pipe(plugins.inject(gulp.src(assets_folder+opts.inject.js_head.glob, {read: false}), {name: 'theme-head', transform: js_inject}))
                .pipe(plugins.inject(gulp.src(opts.inject.js_head.glob, {read: false, cwd: assets_folder}), {name: 'theme-head', transform: js_inject}))
                .pipe(plugins.inject(gulp.src(opts.inject.js.glob, {read: false, cwd: assets_folder}), {name: 'theme', transform: js_inject}))
                .pipe(plugins.inject(gulp.src(opts.inject.css.glob, {read: false, cwd: assets_folder}), {name: 'theme', transform: css_inject}))
                .pipe(gulp.dest(compile_folder + opts.views.outputDir));
    };
};