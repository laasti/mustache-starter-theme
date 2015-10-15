module.exports = function (gulp, plugins, opts) {
    var onlyDirs = function (es) {
        return es.map(function (file, cb) {
            if (file.stat.isFile()) {
                return cb(null, file);
            } else {
                return cb();
            }
        });
    };
    return function () {
        var filter = plugins.filter, 
            args = plugins.yargs.argv, 
            assets_folder = opts.compileDir+opts.assetsDir,
            bower_files = plugins.bowerFiles().files,
            jsFilter = filter(['**/*.js'], {restore: true}),
            cssFilter = filter(['**/*.css'], {restore: true}),
            ignoreFilter = filter(['**/*', '!**/*.scss'], {restore: true});
        
        if (args.dist) {
            return gulp.src(bower_files)
                    .pipe(jsFilter)
                    .pipe(plugins.uglify()).pipe(plugins.concat(opts.bower.concatFilename+'.js'))
                    .pipe(jsFilter.restore)
                    .pipe(cssFilter)
                    .pipe(plugins.uglifycss()).pipe(plugins.concat(opts.bower.concatFilename+'.css'))
                    .pipe(cssFilter.restore)
                    .pipe(ignoreFilter)
                    .pipe(onlyDirs(plugins.eventStream))
                    .pipe(gulp.dest(assets_folder + opts.bower.outputDir));
        } else {
            return gulp.src("./vendor/**").pipe(gulp.dest(assets_folder + "/vendor"));
        }
    };
};