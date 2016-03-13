module.exports = function (gulp, plugins, opts) {
    return function () {
        var compile_folder = opts.compileDir, args = plugins.yargs.argv,            
            assets_folder = opts.compileDir+opts.assetsDir,
            bower_files = plugins.bowerFiles(),
            css_inject = function (filepath, file, i, length) {
                return '<link rel="stylesheet" href="{{{ assetsUrl }}}/vendor' + filepath.replace(opts.bower.installDir.replace('.', ''), '') + '" />';
            },
            js_inject = function (filepath, file, i, length) {
                return '<script type="text/javascript" src="{{{ assetsUrl }}}/vendor' + filepath.replace(opts.bower.installDir.replace('.', ''), '') + '"></script>';
            };


        if (args.dist) {
            return gulp.src(opts.views.glob, {cwd: compile_folder + opts.views.outputDir})
                    .pipe(plugins.inject(gulp.src('./**/*.js', {read: false, cwd: assets_folder + opts.bower.outputDir}), {name: 'bower', transform: js_inject}))
                    .pipe(plugins.inject(gulp.src('./**/*.css', {read: false, cwd: assets_folder + opts.bower.outputDir}), {name: 'bower', transform: css_inject}))
                    .pipe(gulp.dest(compile_folder + opts.views.outputDir));
        } else {
            return gulp.src(opts.views.glob, {cwd: compile_folder + opts.views.outputDir})
                    .pipe(plugins.inject(gulp.src(bower_files.ext('js').files, {read: false, base: opts.bower.installDir}), {name: 'bower', transform: js_inject}))
                    .pipe(plugins.inject(gulp.src(bower_files.ext('css').files, {read: false, base: opts.bower.installDir}), {name: 'bower', transform: css_inject}))
                    .pipe(gulp.dest(compile_folder + opts.views.outputDir));
        }
    };
};
