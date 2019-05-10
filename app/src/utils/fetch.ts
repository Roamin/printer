const api = require('utils/../../api')

const { ipcRenderer } = (window as any).electron

export default function(name: string, data?: any) {
  const { async = false, channel } = api[name]

  return new Promise(resolve => {
    if (async) {
      ipcRenderer.once(`${channel}__reply`, (event: any, arg: any) => {
        resolve(arg)
      })

      ipcRenderer.send(channel, data)
    } else {
      const reply = ipcRenderer.sendSync(channel, data)

      resolve(reply)
    }
  })
}
