import electron from 'electron'

export default {
  install (Vue) {
    Object.defineProperties(Vue.prototype, {
      $electron: {
        get () {
          return electron
        }
      }
    })
  }
}
