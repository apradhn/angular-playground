var gulp = require('gulp');
var gutil = require('gulp-util');
var sass = require('gulp-sass');

gulp.task('sass', function() {
    return gulp.src('sass/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('app/css/'));
});

gulp.task('watch', function() {
    gulp.watch('sass/*.scss', ['sass']);
});
