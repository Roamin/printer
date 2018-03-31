import defaultConfig from './config'

class Editor {
	constructor (config) {
		console.log(config);
		Object.assign(config, defaultConfig)
	}
}

export default Editor