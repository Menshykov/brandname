var syntax = 'sass', // Syntax: sass or scss;
    gulpversion = '4'; // Gulp version: 3 or 4

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    cleanCSS = require('gulp-clean-css'),
    rename = require('gulp-rename'),
    autoprefixer = require('gulp-autoprefixer'),
    notify = require('gulp-notify');

gulp.task('styles', function () {
    return gulp.src('app/' + syntax + '/**/*.' + syntax + '')
        .pipe(sass({ outputStyle: 'expanded' }).on("error", notify.onError()))
        .pipe(rename({ suffix: '.min', prefix: '' }))
        .pipe(autoprefixer(['last 5 versions']))
        .pipe(gulp.dest('app/css'))
});

gulp.task('minify-css', () => {
    return gulp.src('app/css/*.css')
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(gulp.dest('app/css'));
});

if (gulpversion == 3) {
    gulp.task('watch', ['styles', 'minify-css'], function () {
        gulp.watch('app/' + syntax + '/**/*.' + syntax + '', ['styles', 'minify-css']);
    });
    gulp.task('default', ['watch']);
}

if (gulpversion == 4) {
    gulp.task('watch', function () {
        gulp.watch('app/' + syntax + '/**/*.' + syntax + '', gulp.series('styles', 'minify-css'));
    });
    gulp.task('default', gulp.series('styles', 'minify-css', 'watch'));
}