import upload from './upload'

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

        const file = e.dataTransfer.files[0];

		upload(file, '/api/upload');
    }, false);
};
