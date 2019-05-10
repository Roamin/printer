export default function typeOf(obj: any): any {
  const toString = Object.prototype.toString
  const map: {
    [key: string]: string
  } = {
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

  return map[toString.call(obj)]
}
