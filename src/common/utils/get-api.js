import api from '../api'

export default function (name) {
  const keys = name.split('.')
  let result = { ...api }

  keys.forEach(key => {
    result = result[key]
  })

  return result
}
