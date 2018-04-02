import defaultConfig from './config'
import render from './render'
import plugin from './plugin'
import { init as selection } from './util/selection'

class Editor {
	constructor (config) {
		this.config = Object.assign(config, defaultConfig)

		this.$editor = document.getElementById('J_Editor')
		this.$preview = document.getElementById('J_Preview')

		this.bind()
		plugin.call(this)
		selection(this.$editor)

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

	getSelection () {

	}

	setSelection (insertStr) {
		const oldValue = this.$editor.value
		const endPos = this.$editor.selectionEnd
		const startPos = this.$editor.selectionStart

		this.$editor.value = oldValue.substring(0, startPos) + insertStr + oldValue.substring(endPos, oldValue.length)
	}
}

export default Editor