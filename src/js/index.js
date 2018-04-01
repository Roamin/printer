import defaultConfig from './config'
import render from './render'
import plugin from './plugin'

class Editor {
	constructor (config) {
		this.config = Object.assign(config, defaultConfig)

		this.$editor = document.getElementById('J_Editor')
		this.$preview = document.getElementById('J_Preview')

		this.bind()
		plugin(this)

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
		this.$editor.addEventListener('input', (e) => {
			this.$preview.innerHTML = render(e.target.value)
		}, false)
	}
}

export default Editor