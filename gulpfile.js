/**
 * Created by sbawkar on 8/11/2015.
 */
var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    rename = require('gulp-rename'),
    minify = require('gulp-minify-css'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    connect =  require('gulp-connect'),
    runSequence = require('run-sequence'),
    sourcemaps = require('gulp-sourcemaps');


gulp.task('process-styles', function() {
    console.log('process-styles');
    return sass('src/style.scss')
       .pipe(gulp.dest('dist/css/'))
       .pipe(rename({
           suffix: '.min'
       }))
       .pipe(minify())
       .pipe(gulp.dest('dist/css/'))
       .pipe(connect.reload());

});

gulp.task('process-scripts', function() {
    console.log('process-scripts');
    return gulp.src('src/js/**/*.js')
        .pipe(sourcemaps.init())
       .pipe(concat('build.js'))
        .pipe(sourcemaps.write())
       .pipe(gulp.dest('dist/js/'))
       .pipe(rename({
           suffix: '.min'
       }))
       .pipe(uglify())
        .pipe(gulp.dest('dist/js/'))
       .pipe(connect.reload());


});

gulp.task('copy-images', function() {
    return gulp.src('src/images/**/*')
        .pipe(gulp.dest('dist/images/'));
});

gulp.task('watch', function() {
   gulp.watch('src/style.scss', ['process-styles']);
    gulp.watch('src/js/**/*.js', ['process-scripts']);
});

gulp.task('connect', function() {
    console.log('connect');
        connect.server({
        livereload: true
    });
});

gulp.task('default', function() {
    runSequence(['copy-images', 'process-styles', 'process-scripts', 'connect', 'watch']);
});