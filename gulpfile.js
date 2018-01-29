const del = require('del');
const gulp = require('gulp');
const sass = require('gulp-sass');
const rename = require("gulp-rename");
const toc = require('gulp-html-toc');
const babel = require('gulp-babel');

// 路径 globs 配置
const paths = {
    styles: {
        src: 'src/scss/**/*.scss',
        dest: 'src/style/'
    },
    scripts: {
        src: 'src/js/index.js',
        dest: 'build/'
    }
};

// 清除 build 目录
const clean = () => {
    return del(paths.scripts.dest);
};

//  sass 编译
const styles = () => {
    return gulp.src(paths.styles.src)
    .pipe(sass({
        outputStyle: 'compact'
    }).on('error', sass.logError))
    .pipe(gulp.dest(paths.styles.dest));
};

// watch 文件改变，重新编译
const watchFiles = () => {
    gulp.watch(paths.styles.src, styles);
};

// const render = () => {
//     return gulp.src('input/*.md')
//     .pipe(html())
//     .pipe(rename('doc.html'))
//     .pipe(gulp.dest('output/'));
// };
//
// const makeToc = () => {
//     return gulp.src('output/*.html')
//     .pipe(toc({
//         id: '#toc',
//         selectors: 'h1,h2,h3,h4,h5,h6'
//     }))
//     .pipe(gulp.dest('output/'));
// };

const scripts = () => {
    return gulp.src(paths.scripts.src)
    .pipe(babel({
        presets: [
            'es2015'
        ]
    }))
    .pipe(gulp.dest(paths.scripts.dest));
};

// 默认
const build = gulp.series(clean, scripts);

gulp.task('watch', watchFiles);
gulp.task('default', build);