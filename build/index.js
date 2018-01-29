'use strict';

var _render = require('./render');

var _render2 = _interopRequireDefault(_render);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var $editor = document.querySelector('#J_Editor');
var $preview = document.querySelector('#J_Preview');

$editor.addEventListener('input', function () {
	var html = (0, _render2.default)(this.value);

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

	var dt = e.dataTransfer;
	uploadFile(dt.files[0], '/api/upload');
}, false);

function uploadFile(file, url) {
	var fileSize = (file.size / 1024 / 1024).toFixed(2);
	var fileName = file.name;
	var fileType = file.type;

	var xhr = new XMLHttpRequest();
	var formData = new FormData();

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
		var percentComplete = Math.round(xhr.loaded * 100 / xhr.total);
		console.log('已上传：' + percentComplete);
	}
}

function uploadComplete(xhr) {
	var res = JSON.parse(xhr.target.response);
	var startPos = $editor.selectionStart;
	var endPos = $editor.selectionEnd;
	var str = '![demo.jpg](' + res.data.pictureUrl + ')';

	$editor.value = $editor.value.substring(0, startPos) + str + $editor.value.substring(endPos, $editor.value.length);
	$editor.selectionStart = startPos + str.length;
	$editor.selectionEnd = startPos + str.length;
}

function uploadError(xhr) {
	console.log(xhr);
}

function uploadCanceled(xhr) {
	console.log(xhr);
}