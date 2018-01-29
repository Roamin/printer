/**
 * 上传进度
 * @param xhr
 */
const uploadProgress = xhr => {
    if (xhr.lengthComputable) {
        const percentComplete = Math.round(xhr.loaded * 100 / xhr.total);
        console.log('已上传：' + percentComplete);
    }
};

/**
 *
 * @param xhr
 */
const uploadComplete = xhr => {
    const res = JSON.parse(xhr.target.response);
    const startPos = $editor.selectionStart;
    const endPos = $editor.selectionEnd;

    let str = `![demo.jpg](${ res.data.pictureUrl })`;

    $editor.value = $editor.value.substring(0, startPos)
        + str
        + $editor.value.substring(endPos, $editor.value.length);
    $editor.selectionStart = startPos + str.length;
    $editor.selectionEnd = startPos + str.length;
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

export default sMd => {
    return md.render(sMd);
};
