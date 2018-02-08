import render from './render';
import image from './image/index'

const $editor = document.querySelector('#J_Editor');
const $preview = document.querySelector('#J_Preview');

// bug 拖动文字会报错
$editor.addEventListener('input', function () {
	const html = render(this.value);

	$preview.innerHTML = html;
});

$editor.addEventListener('paste', function (e) {
	const item = e.clipboardData.items[0];

	console.log(item);

	if (item.kind === 'file') {
		var blob = item.getAsFile();
		var reader = new FileReader();
		reader.onload = function(event) {
			console.log(event.target.result)
		}; // data url!
		reader.readAsDataURL(blob);
	}
});

image($editor);

class Editor {
	constructor(ele) {
		this.ele = ele;
	}
}

window.a = new Editor($editor);