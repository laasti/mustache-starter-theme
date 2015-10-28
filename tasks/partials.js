module.exports = function (gulp, plugins, opts) {
    return function () {
        var views_dir = opts.compileDir + opts.views.outputDir;
        var partials_files = plugins.glob.sync(opts.views.partialsGlob, {cwd: views_dir, base: views_dir});
        var partials = {};

        partials_files.map(function (file) {
            var filename = file.replace(opts.views.replaceBase, '').split(".").shift();
            partials[filename] = plugins.fs.readFileSync(views_dir+file.replace(/^\./, ''), 'utf8');
        });

        return partials;
    };
};