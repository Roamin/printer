export default ele => {
    // 进入
    ele.addEventListener('dragenter', function (e) {
        e.preventDefault();
    }, false);

    // 拖动
    ele.addEventListener('dragover', function (e) {
        e.preventDefault();
    }, false);

    // 离开
    ele.addEventListener('dragleave', function (e) {
        e.preventDefault();
    }, false);

    // 松开
    ele.addEventListener('drop', function (e) {
        e.preventDefault();

        const dt = e.dataTransfer;
        uploadFile(dt.files[0], '/api/upload');
    }, false);
};
