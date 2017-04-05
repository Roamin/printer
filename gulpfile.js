/**
 * Created by ivill on 2017/4/5.
 */

const gulp = require('gulp');
const template = require('gulp-template');

gulp.task('default', () => {
    gulp.src('input/doc.html')
        .pipe( template({name: 'Sindre'}) )
        .pipe(gulp.dest('dist'));
}