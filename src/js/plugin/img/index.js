import  bind from './bind'

class Img {
	constructor (editor) {
		this.editor = editor

		this.bind()
	}

	bind () {
		bind.call(this)
	}
}

export default Img
