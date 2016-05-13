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
    
    gulp.task('clean', task('clean'));
    gulp.task('bower', gulp.series(
        plugins.shell.task('bower install'),
        task('bower_publish'),
        task('bower_inject')
    ));
    gulp.task('require', gulp.series(plugins.shell.task(['bower install '+plugins.yargs.argv.p+' --save']), task('bower_publish'), task('bower_inject')));    
    
    gulp.task('assets', gulp.series('clean', task('icons'), gulp.parallel(task('bower_publish'), task('images'), task('sass'), task('js'), task('views_copy'))));
    gulp.task('build', gulp.series('assets', task('bower_inject'), task('inject')));

    gulp.task('default', gulp.series('build'));
    gulp.task('publish',  gulp.series('build', task('pages')));
    gulp.task('serve', gulp.series('publish', task('serve')));
    gulp.task('install', gulp.series('bower', 'publish'));
    gulp.task('update',  gulp.series(plugins.shell.task('bower update'), 'publish'));


    gulp.task('sync', gulp.series('publish', function () {
        gulp.watch('./src/icons/**', gulp.series(task('icons'), gulp.parallel(task('sass'), task('pages')), plugins.browserSync.reload));
        gulp.watch('./src/images/**', gulp.series(task('images'), plugins.browserSync.reload));
        gulp.watch('./src/scss/**', task('sass'));
        gulp.watch('./src/js/**', gulp.series(task('js'), plugins.browserSync.reload));
        
        gulp.watch('./src/views/**', gulp.series(task('views_copy'), task('bower_inject'), task('inject'), plugins.browserSync.reload));
        gulp.watch('./data/**', gulp.series(task('pages'), plugins.browserSync.reload));
        gulp.watch('./pages/**', gulp.series(task('pages'), plugins.browserSync.reload));
    }));
    gulp.task('syncWatch', function () {
        gulp.watch('./src/icons/**', gulp.series(task('icons'), gulp.parallel(task('sass'), task('pages')), plugins.browserSync.reload));
        gulp.watch('./src/images/**', gulp.series(task('images'), plugins.browserSync.reload));
        gulp.watch('./src/scss/**', task('sass'));
        gulp.watch('./src/js/**', gulp.series(task('js'), plugins.browserSync.reload));
        
        gulp.watch('./src/views/**', gulp.series(task('views_copy'), task('bower_inject'), task('inject'), task('pages'), plugins.browserSync.reload));
        gulp.watch('./data/**', gulp.series(task('pages'), plugins.browserSync.reload));
        gulp.watch('./pages/**', gulp.series(task('pages'), plugins.browserSync.reload));
    });
    gulp.task('watch', gulp.series('publish', gulp.parallel('serve', 'syncWatch')));
}(require));