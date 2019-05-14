const typeofMap = {
  '[object Boolean]': 'boolean',
  '[object Number]': 'number',
  '[object String]': 'string',
  '[object Function]': 'function',
  '[object Array]': 'array',
  '[object Date]': 'date',
  '[object RegExp]': 'regExp',
  '[object Undefined]': 'undefined',
  '[object Null]': 'null',
  '[object Object]': 'object'
}

export default function typeOf (obj) {
  const toString = Object.prototype.toString

  return typeofMap[toString.call(obj)]
}
