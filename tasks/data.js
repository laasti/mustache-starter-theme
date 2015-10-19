module.exports = function (gulp, plugins, opts) {
    return function () {
        var data_files = plugins.glob.sync(opts.data.glob);
        var data = {};

        data_files.map(function (file) {
            var filename = file.replace(opts.data.replaceBase, '');
            var content = JSON.parse(plugins.fs.readFileSync(file, 'utf8'));
            var path = [];
            if (filename !== opts.data.globalFile) {
                path = filename.replace('/', '.').split('.');
                //Remove json
                path.pop();
            }
            var current_data = data;
            for (var i = 0; i < path.length; i++) {
                current_data[path[i]] = {};
                current_data = current_data[path[i]];
            }
            for (var i in content) {
                current_data[i] = content[i];
            }
        });
        data.languages = {};
        var lang_files = plugins.glob.sync(opts.data.langDir+'/**/*.json');
        lang_files.map(function (file) {
            var filename = file.replace(opts.data.langDir+'/', '');
            var content = JSON.parse(plugins.fs.readFileSync(file, 'utf8'));
            var path = [];
            if (filename !== opts.data.langMainFile) {
                path = filename.replace('/', '.').split('.');
                //Remove json
                path.pop();
            }
            var current_data = data.languages;
            for (var i = 0; i < path.length; i++) {
                current_data[path[i]] = {};
                current_data = current_data[path[i]];
            }
            for (var i in content) {
                current_data[i] = content[i];
            }
        });

        return data;
    };
};