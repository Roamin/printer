import Img from './img/index'

class Plugin {
	constructor (editor) {
		this.image = new Img(editor)
	}
}

export default Plugin