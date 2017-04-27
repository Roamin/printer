/**
 * Created by Live on 2017/4/5.
 */

const del = require('del');
const gulp = require('gulp');
const markdown = require('gulp-markdown');

// clear old files
gulp.task('clean', () => {
    del([
        'output/*'
    ]);
});

gulp.task('convert', () => {
    return gulp.src('input/*.md')
        .pipe(markdown())
        .pipe(gulp.dest('output/'));
});

gulp.task('default', ['clean', 'convert']);