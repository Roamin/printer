import { ipcRenderer } from 'electron'
import getApi from 'common/utils/get-api'

let frameId = 0

export default function (name, data) {
  const { async = true, channel } = getApi(name)

  return new Promise((resolve, reject) => {
    frameId++

    if (async) {
      ipcRenderer.once(`${channel}__${frameId}__reply`, (event, arg) => {
        resolve(arg)
      })

      ipcRenderer.once(`${channel}__${frameId}__error`, (event, arg) => {
        reject(arg)
      })

      ipcRenderer.send(channel, {
        ...data,
        __frameId: frameId
      })
    } else {
      const reply = ipcRenderer.sendSync(channel, data)

      resolve(reply)
    }
  })
}
