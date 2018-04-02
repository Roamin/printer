let $editor = null

export function setSelection (insertStr) {
	const oldValue = $editor.value
	const endPos = $editor.selectionEnd
	const startPos = $editor.selectionStart

	$editor.value = oldValue.substring(0, startPos) + insertStr + oldValue.substring(endPos, oldValue.length)
}

export function init($el) {
    $editor = $el
}
