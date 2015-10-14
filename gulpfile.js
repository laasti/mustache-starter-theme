(function (require) {
    'use strict';
    //TODO add a warning file to puslished assets
    var gulp = require("gulp"),
    options = require('./gulpconfig.json'),
    task = function(task) {
        return require(options.tasksDir+'/' + task)(gulp, plugins, options);
    },
    plugins = require('gulp-load-plugins')({
        pattern: ['**'],
        replaceString: /^gulp(-|\.)/,
        camelize: true,
        lazy: true,
        rename: {}
    });
    options.compileDir = require(options.tasksDir+'/compileDir.js')(gulp, plugins, options)();

    plugins.data = require(options.tasksDir+'/data.js');
    
    gulp.task('serve', task('serve'));
    gulp.task('bower_main_files', task('bower_main'));
    gulp.task('clean', task('clean'));

    gulp.task('bower', ['bower_main_files'], task('bower'));
    gulp.task('bower:clean', ['clean', 'bower_main_files'], task('bower'));
    gulp.task('fontello', task('fontello'));
    gulp.task('fontello:clean', ['clean'], task('fontello'));
    gulp.task('images', task('images'));
    gulp.task('images:clean', ['clean'], task('images'));
    gulp.task('sass', task('sass'));
    gulp.task('sass:clean', ['clean'], task('sass'));
    gulp.task('js', task('js'));
    gulp.task('js:clean', ['clean'], task('js'));
    gulp.task('copy_views', task('views_copy'));
    gulp.task('copy_views:clean', ['clean'], task('views_copy'));
    gulp.task('publish_assets', ['images:clean', 'sass:clean', 'bower:clean', 'js:clean', 'copy_views:clean', 'fontello:clean']);
    gulp.task('inject_bower', ['publish_assets'], task('bower_inject'));
    gulp.task('inject_theme', ['publish_assets'], task('inject'));
    gulp.task('build', ['inject_bower'], task('inject'));

    gulp.task('html', ['copy_views'], task('mustache'));

    gulp.task('default', ['build']);
    gulp.task('publish', ['build'], task('mustache'));

    gulp.task('sync', function () {
        gulp.watch('./src/fontello/**', ['fontello']);
        gulp.watch('./src/images/**', ['images']);
        gulp.watch('./src/scss/**', ['sass']);
        gulp.watch('./src/js/**', ['js']);
        gulp.watch('./src/views/**/*.mustache', task('views_copy'));
        gulp.watch(compile_folder + '/views/**/*.mustache', task('mustache'));
    });
    gulp.task('watch', ['serve', 'sync']);
}(require));