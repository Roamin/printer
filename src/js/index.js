import defaultConfig from './config'
import render from './render'
import Plugin from './plugin'
import SelectionAPI from './util/selection'

class Editor {
	constructor (config) {
		this.config = Object.assign(config, defaultConfig)

		this.$editor = document.getElementById('J_Editor')
		this.$preview = document.getElementById('J_Preview')

		this.bind()
		this.plugin = new Plugin(this)
		this.selection = new SelectionAPI(this)

		console.log(this.getUID(this.config.id))
	}

	getUID (prefix) {
		do {
			prefix += ~~(Math.random() * 1000000)
		}
		while (document.getElementById(prefix))

		return prefix
	}

	bind () {
		this.$editor.addEventListener('input', () => {
			this.preview()
		}, false)
	}

	preview () {
		this.$preview.innerHTML = render(this.$editor.value)
	}
}

export default Editor