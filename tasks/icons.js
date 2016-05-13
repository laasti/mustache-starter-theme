module.exports = function (gulp, plugins, opts) {
    
    return function (done) {
        var compileDir = opts.compileDir,
                assetsDir = compileDir+opts.assetsDir;
        var runTimestamp = Math.round(Date.now()/1000);
        return gulp.src(opts.icons.glob)
                .pipe(plugins.iconfont({
                    fontName: opts.icons.fontName,
                    prependUnicode: false,
                    timestamp: runTimestamp
                }))
                .on('glyphs', function(glyphs, options) {
                    gulp.src('./tasks/icons.scss.tmpl')
                    .pipe(plugins.consolidate('lodash', {
                    glyphs: glyphs,
                    fontName: opts.icons.fontName,
                    fontPath: opts.icons.cssFontPath,
                    className: opts.icons.className
                  }))
                .pipe(plugins.rename("_icons.scss"))
                  .pipe(gulp.dest(opts.sass.glob.replace('/**', '')));
                    gulp.src('./tasks/icons.mustache.tmpl')
                    .pipe(plugins.consolidate('lodash', {
                    glyphs: glyphs,
                    fontName: opts.icons.fontName,
                    fontPath: opts.icons.cssFontPath,
                    className: opts.icons.className
                  }))
                  .pipe(plugins.rename(opts.icons.partialFile))
                    .pipe(gulp.dest(opts.views.workingDir));
                  })
                  .pipe(gulp.dest(assetsDir+opts.icons.outputDir));
    };
};