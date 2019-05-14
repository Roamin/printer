import { ipcRenderer } from 'electron'
import getApi from 'common/utils/get-api'

export default function (name, data) {
  const { async = true, channel } = getApi(name)

  return new Promise(resolve => {
    if (async) {
      ipcRenderer.once(`${channel}__reply`, (event, arg) => {
        resolve(arg)
      })

      ipcRenderer.send(channel, data)
    } else {
      const reply = ipcRenderer.sendSync(channel, data)

      resolve(reply)
    }
  })
}
