class Dom {
	constructor (selector) {
		if (typeof selector === 'undefined') {
			return
		}

		if (selector instanceof Dom) {
			return selector
		}

		this.selector = selector
	}


}

export default $