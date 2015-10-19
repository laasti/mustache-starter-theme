module.exports = function (gulp, plugins, opts) {
    return function () {
        plugins.browserSync({
            server: {
                baseDir: opts.compileDir,
                index: opts.browserSync.index
            },
            notify: false
        });
    };
};