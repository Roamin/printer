'use stric';

const gutil = require('gulp-util');
const through = require('through2');
const MarkdownIt = require('markdown-it');
const hljs = require('./src/js/highlight');

const markdown = new MarkdownIt({
    highlight: function (str, lang) {
        if (lang && hljs.getLanguage(lang)) {
            try {
                return hljs.highlight(lang, str).value;
            } catch (__) {}
        }

        return ''; // use external default escaping
    }
}).use(require('markdown-it-mark'));


module.exports = function (options) {
    return through.obj(function compilePug(file, enc, cb) {
        if (file.isNull()) {
            cb(null, file);

            return;
        }

        if (file.isStream()) {
            cb(new gutil.PluginError('gulp-esprima', 'Streaming not supported'));
            return;
        }

        // 解析 API 文件
        const content = markdown.render(file.contents.toString());
        const html = '<!DOCTYPE html>' +
            '<html lang="en">' +
            '<head>' +
                '<meta charset="UTF-8">' +
                '<title>Document</title>' +
                // '<link rel="stylesheet" type="text/css" href="../src/css/github.css">' +
            '</head>' +
            '<body>' +
                '<div class="readme">' +
                    '<div class="markdown-body">' + content + '</div>' +
                '</div>' +
            '</body>' +
            '</html>';

        // 输出解析内容
        file.contents = new Buffer(html);

        cb(null, file);
    });
};