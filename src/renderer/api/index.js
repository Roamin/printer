export const BASE_URL = '//domain.com/'

const API = {
  baseURL: BASE_URL
}

export function getApiUrl (apiName) {
  const api = API[apiName]

  return `${BASE_URL}${api.url}`
}

export default API
