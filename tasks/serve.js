module.exports = function (gulp, plugins, opts) {
    return function () {
        browserSync({
            server: {
                baseDir: opts.compileDir,
                index: opts.browserSync.index
            },
            notify: false
        });
    };
};