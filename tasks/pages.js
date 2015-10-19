module.exports = function (gulp, plugins, opts) {
    var jsonToMustache = function(global_data) {
        function transform(file, cb) {
            
            if (file.isBuffer()) {
                var data = JSON.parse(String(file.contents));
                data[opts.data.titleVar] = data.title;
                delete data.title;
                data[opts.data.contentVar] = data.body;
                delete data.body;
                data = plugins.merge.recursive(global_data, data);
                data.lang = data.languages[data.locale];
                var mustacheStream = plugins.mustache(data, {extension: ".html"});
                mustacheStream.once('data', function(newFile) {
                    file.contents = newFile.contents;
                });
                var newFile = new plugins.vinyl({
                    base: opts.compileDir+opts.views.outputDir+'/',
                    path: opts.compileDir+opts.views.outputDir+'/'+data[opts.data.templateVar],
                    contents: plugins.fs.readFileSync(opts.compileDir+opts.views.outputDir+'/'+data[opts.data.templateVar])
                });
                mustacheStream.write(newFile);
            }

            // if there was some error, just pass as the first parameter here
            cb(null, file);
          }
          return require('event-stream').map(transform);
    };
    return function () {
        var compile_folder = opts.compileDir, args = plugins.yargs.argv,
                data = plugins.data(gulp, plugins, opts)(),
                filter = plugins.filter(['**/*.html', '**/*.md'], {restore: true});

        return gulp.src(opts.pages.glob)
                .pipe(filter)
                .pipe(plugins.markitJson())
                .pipe(filter.restore)
                .pipe(jsonToMustache(data))
                .pipe(plugins.htmlPrettify({indent_char: ' ', indent_size: 4}))
                .pipe(plugins.removeEmptyLines())
                .pipe(plugins.rename({extname:'.html'}))
                .pipe(gulp.dest(compile_folder))
                .pipe(plugins.browserSync.reload({stream: true}));
    };
};