import { setSelection } from "../../util/selection";

const CONFIG = {
	size: 10 * 1024 * 1024,
	mimeTypes: 'image/jpeg'
};

/**
 * 上传进度
 * @param xhr
 */
const uploadProgress = xhr => {
    if (xhr.lengthComputable) {
        const percentComplete = Math.floor(xhr.loaded / xhr.total * 100);
    }
};

/**
 *
 * @param xhr
 */
const uploadComplete = xhr => {
    const res = JSON.parse(xhr.target.response);
    const $editor = document.querySelector('#J_Editor');
    const startPos = $editor.selectionStart;
    const endPos = $editor.selectionEnd;

    let str = `![demo.jpg](${ res.data })`;

	setSelection(str)
};

/**
 * 上传出错
 * @param xhr
 */
function uploadError(xhr) {
    console.log(xhr);
}

/**
 * 上传取消
 * @param xhr
 */
function uploadCanceled(xhr) {
    console.log(xhr);
}

function filter(file) {
	console.log(file.size, CONFIG.size);
	if (file.size > CONFIG.size) {
		return false;
	}

	if (CONFIG.mimeTypes.indexOf(file.type) === -1) {
		return false;
	}

	return true;
}

export default (file, url) => {
	if (!filter(file)) {
		return false;
	}

	const xhr = new XMLHttpRequest();
	const formData = new FormData();

	formData.append('uploadfile', file);

	xhr.upload.addEventListener('progress', uploadProgress, false);
	xhr.addEventListener('load', uploadComplete, false);
	xhr.addEventListener('error', uploadError, false);
	xhr.addEventListener('abort', uploadCanceled, false);
	xhr.open('POST', url, true);
	xhr.send(formData);
};
