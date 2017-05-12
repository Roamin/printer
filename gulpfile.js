/**
 * Created by Live on 2017/4/5.
 */

const del = require('del');
const gulp = require('gulp');
const rename = require("gulp-rename");
const html = require('./html');

// clear old files
gulp.task('clean', () => {
    del([
        'output/*'
    ]);
});

gulp.task('convert', () => {
    return gulp.src('input/*.md')
        .pipe(html())
        .pipe(rename('doc.html'))
        .pipe(gulp.dest('output/'));
});

gulp.task('default', ['clean', 'convert']);