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
    plugins.fs = require('fs');
    options.compileDir = require(options.tasksDir+'/compileDir.js')(gulp, plugins, options)();

    plugins.data = require(options.tasksDir+'/data.js');
    plugins.partials = require(options.tasksDir+'/partials.js');
    
    gulp.task('serve', task('serve'));
    gulp.task('bower_main_files', task('bower_main'));
    gulp.task('clean', task('clean'));
    gulp.task('bower', gulp.series('bower_main_files', task('bower')));
    gulp.task('fontello', task('fontello'));
    gulp.task('images', task('images'));
    gulp.task('sass', task('sass'));
    gulp.task('js', task('js'));
    gulp.task('copy_views', task('views_copy'));
    gulp.task('inject_bower', task('bower_inject'));
    gulp.task('inject_assets', task('inject'));
    gulp.task('pages', task('pages'));
    gulp.task('publish_assets', gulp.series('clean', gulp.parallel('images', 'sass', 'bower', 'js', 'copy_views', 'fontello')));
    gulp.task('build', gulp.series('publish_assets', 'inject_bower', 'inject_assets'));

    gulp.task('default', gulp.series('build'));
    gulp.task('publish',  gulp.series('build', task('pages')));

    gulp.task('sync', function () {
        gulp.watch('./src/fontello/**', gulp.parallel('fontello'));
        gulp.watch('./src/images/**', gulp.parallel('images'));
        gulp.watch('./src/scss/**', gulp.parallel('sass'));
        gulp.watch('./src/js/**', gulp.parallel('js'));
        gulp.watch('./src/views/**', gulp.parallel('copy_views'));
        gulp.watch(options.compileDir + '/views/**', gulp.parallel('pages'));
    });
    gulp.task('watch', gulp.parallel('serve', 'sync'));
}(require));