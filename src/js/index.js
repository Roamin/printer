/**
 * Created by ivill on 2017/5/15.
 */

const $editor = document.querySelector('#J_Editor');
const $preview = document.querySelector('#J_Preview');

const markdownParser = window.markdownit();

$editor.addEventListener('input', function () {
	const html = markdownParser.render(this.value);

	$preview.innerHTML = html;
});

//进入
$editor.addEventListener('dragenter', function (e) {
	e.preventDefault();
}, false);

//拖动
$editor.addEventListener('dragover', function (e) {
	e.preventDefault();
}, false);

//离开
$editor.addEventListener('dragleave', function (e) {
	e.preventDefault();
}, false);

//松开
$editor.addEventListener('drop', function (e) {
	e.preventDefault();

	const dt = e.dataTransfer;
	uploadFile(dt.files[0], '/api/upload');
}, false);

function uploadFile(file, url) {
	const fileSize = ( file.size / 1024 / 1024 ).toFixed(2);
	const fileName = file.name;
	const fileType = file.type;

	const xhr = new XMLHttpRequest();
	const formData = new FormData();

	formData.append('uploadfile', file);

	xhr.upload.addEventListener('progress', uploadProgress, false);
	xhr.addEventListener('load', uploadComplete, false);
	xhr.addEventListener('error', uploadError, false);
	xhr.addEventListener('abort', uploadCanceled, false);
	xhr.open('POST', url, true);
	xhr.send(formData);
}

//进度把控
function uploadProgress(xhr) {
	if (xhr.lengthComputable) {
		const percentComplete = Math.round(xhr.loaded * 100 / xhr.total);
		console.log('已上传：' + percentComplete);
	}
}

function uploadComplete(xhr) {
	const res = JSON.parse(xhr.target.response);
	var startPos = $editor.selectionStart;
	var endPos = $editor.selectionEnd;
	let str = `![demo.jpg](${ res.data.pictureUrl })`;



	$editor.value = $editor.value.substring(0, startPos)
			+ str
			+ $editor.value.substring(endPos, $editor.value.length);
	$editor.selectionStart = startPos + str.length;
	$editor.selectionEnd = startPos + str.length;
}

function uploadError(xhr) {
	console.log(xhr);
}

function uploadCanceled(xhr) {
	console.log(xhr);
}