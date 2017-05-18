/**
 * Created by Live on 2017/4/5.
 */

const del = require('del');
const gulp = require('gulp');
const rename = require("gulp-rename");
const toc = require('gulp-html-toc');

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

gulp.task('toc', () => {
    return gulp.src('output/*.html')
        .pipe(toc({
            id: '#toc',
            selectors: 'h1,h2,h3,h4,h5,h6'
        }))
        .pipe(gulp.dest('output/'));
});

gulp.task('default', ['clean', 'convert', 'toc']);