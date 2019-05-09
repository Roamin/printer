import api from 'api'

export default function(name: string, data?: any) {
  console.log(window)
  const { ipcRenderer } = (window as any).electron
  const { async = false, channel } = api[name]

  console.log(async, channel)

  if (async) {
    ipcRenderer.on(`${channel}-reply`, (event: any, arg: any) => {
      console.log(arg)
    })

    ipcRenderer.send(channel, data)
  } else {
    ipcRenderer.sendSync(channel, data)
  }
}
