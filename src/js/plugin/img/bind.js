import  upload from './upload'

export default function () {
	const ele = this.editor.$editor

	console.log(ele)

    // 进入
    ele.addEventListener('dragenter', e => {
        e.preventDefault()
    }, false)

    // 拖动
    ele.addEventListener('dragover', e => {
        e.preventDefault()
    }, false)

    // 离开
    ele.addEventListener('dragleave', e => {
        e.preventDefault()
    }, false)

    // 松开
    ele.addEventListener('drop', e => {
        e.preventDefault()

        const files = e.dataTransfer.files

		upload.call(this, files[0], '/api/upload')
    }, false)
}
