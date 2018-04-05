let $editor = null

class API {
	constructor (editor) {
		this.editor = editor;
	}

	set (insertStr) {
		const $editor = this.editor.$editor
		const oldValue = $editor.value
		const endPos = $editor.selectionEnd
		const startPos = $editor.selectionStart

		$editor.value = oldValue.substring(0, startPos) + insertStr + oldValue.substring(endPos, oldValue.length)
	}
}

export default API
