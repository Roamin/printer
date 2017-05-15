/**
 * Created by ivill on 2017/5/15.
 */

const $html = $('#J_HTML');
const $markdownContnet = $('#J_MarkdownContent');

const markdownParser = window.markdownit();

$markdownContnet.on('input', function () {
    const html = markdownParser.render(this.value);

    $html.html(html);
});