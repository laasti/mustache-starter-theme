module.exports = function (gulp, plugins, opts) {
    return function () {
        var compile_folder = opts.compileDir, args = plugins.yargs.argv,            
            assets_folder = opts.compileDir+opts.assetsDir,
            bower_files = plugins.bowerFiles().files,
            css_inject = function (filepath, file, i, length) {
                return '<link rel="stylesheet" href="' + filepath.replace(opts.bower.installDir.replace('.'), '{{{ assets_url }}}/vendor') + '" />';
            },
            js_inject = function (filepath, file, i, length) {
                return '<script type="text/javascript" src="' + filepath.replace('/bower_components', '{{{ assets_url }}}/vendor') + '"></script>';
            };


        if (args.dist) {
            return gulp.src(compile_folder + opts.views.glob)
                    .pipe(inject(gulp.src(assets_folder + opts.bower.outputDir+'/**/*.js', {read: false}), {name: 'bower', transform: js_inject}))
                    .pipe(inject(gulp.src(assets_folder + opts.bower.outputDir+'/**/*.css', {read: false}), {name: 'bower', transform: css_inject}))
                    .pipe(gulp.dest(compile_folder + opts.views.outputDir));
        } else {
            return gulp.src(compile_folder + opts.options.glob)
                    .pipe(inject(gulp.src(bower_files.ext('js').files, {read: false, base: opts.bower.installDir}), {name: 'bower', transform: js_inject}))
                    .pipe(inject(gulp.src(bower_files.ext('css').files, {read: false, base: opts.bower.installDir}), {name: 'bower', transform: css_inject}))
                    .pipe(gulp.dest(compile_folder + opts.views.outputDir));
        }
    };
};