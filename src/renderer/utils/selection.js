export function setSelection (el, insertStr) {
  const oldValue = el.value
  const ePos = el.selectionEnd
  const sPos = el.selectionStart

  el.value =
    oldValue.substring(0, sPos) +
    insertStr +
    oldValue.substring(ePos, oldValue.length)
}
