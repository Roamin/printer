import render from './render';
import image from './image/index'

const $editor = document.querySelector('#J_Editor');
const $preview = document.querySelector('#J_Preview');

$editor.addEventListener('input', function () {
	const html = render(this.value);

	$preview.innerHTML = html;
});

image($editor);