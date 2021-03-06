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
            return gulp.src(bower_files, {'base': opts.bower.installDir})
                    .pipe(jsFilter)
                    .pipe(plugins.uglify()).pipe(plugins.concat(opts.bower.concatFilename+'.js'))
                    .pipe(jsFilter.restore)
                    .pipe(cssFilter)
                    .pipe(plugins.cssUrlAdjuster({
                        replace: function(path) {
                            var filepath = path.replace(/(?:\.\.[\/\\])+([^\?\#]*)(?:[\?\#]{1}.*)$/g, '$1').replace(/[\/\\]/g, '[\\\\\\\/]{1}');
                            var basepath = (process.cwd()+(opts.bower.installDir.replace('.', ''))).replace(/[\/\\]/g, '[\\\\\\\/]{1}');
                            var match_files = bower_files.filter(function(path) {return (new RegExp(filepath)).test(path);});
                            var file;
                            if (match_files.length) {
                                file = match_files.pop().replace(new RegExp(basepath, 'g'), '').replace(/\\/g, '/').replace(/^\//, '');
                                if (path.match(/(?:\.\.[\/\\])+(?:[^\?\#]*)([\?\#]{1}.*)$/g)) {
                                    file += path.replace(/(?:\.\.[\/\\])+(?:[^\?\#]*)([\?\#]{1}.*)$/g, '$1');
                                }
                            } else {
                                file = path;
                            }
                            return file;
                        }
                    }))
                    .pipe(plugins.uglifycss()).pipe(plugins.concat(opts.bower.concatFilename+'.css'))
                    .pipe(cssFilter.restore)
                    .pipe(ignoreFilter)
                    .pipe(onlyDirs(plugins.eventStream))
                    .pipe(gulp.dest(assets_folder + opts.bower.outputDir));
        } else {
            return gulp.src(opts.bower.glob).pipe(gulp.dest(assets_folder + opts.bower.outputDir));
        }
    };
};