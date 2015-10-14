module.exports = function (gulp, plugins, opts) {
    return function () {
        return gulp.src("./src/views/**/*.mustache").pipe(gulp.dest(compile_folder + '/views'));
    };
};