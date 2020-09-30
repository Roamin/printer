import axios from 'axios'

import API from '@/api'

const CancelToken = axios.CancelToken
const _axios = axios.create({
  baseURL: API.baseURL,
  timeout: 10000
})

function mixinAuth (params = {}) {
  return {
    ...params
  }
}

_axios.interceptors.request.use(config => {
  switch (config.method) {
    case 'put':
    case 'post':
    case 'patch':
      config.data = mixinAuth(config.data)

      break
    default:
      config.params = mixinAuth(config.data)
  }

  return config
}, error => {
  return Promise.reject(error)
})

_axios.interceptors.response.use(response => {
  const res = response.data

  if (res.code !== 200) {
    return Promise.reject(new Error(res.msg))
  }

  return res
}, error => {
  return Promise.reject(error)
})

export function getApiByName (api, data = {}) {
  let { url, method, suffix } = API[api]

  if (typeof suffix !== 'undefined' && suffix.trim() !== '') {
    url = url.replace(`:${suffix}`, data[suffix])
  }

  return {
    url,
    method
  }
}

export function ajax (api, data = {}, cancellation = () => { }) {
  const { url, method } = getApiByName(api)

  return new Promise(resolve => {
    _axios({
      url,
      method,
      data,
      cancelToken: new CancelToken(cancellation)
    }).then(res => {
      resolve([null, res.data])
    }).catch(err => {
      resolve([err, null])
    })
  })
}

export default {
  install (Vue) {
    Vue.prototype.$ajax = ajax
  }
}
