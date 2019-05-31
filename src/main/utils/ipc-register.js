import { ipcMain } from 'electron'

import getApi from 'common/utils/get-api'

export default function (name, handle) {
  const { async = true, channel } = getApi(name)

  if (async) {
    ipcMain.on(channel, (event, data) => {
      handle(
        event,
        data,
        res => {
          event.sender.send(`${channel}__reply`, res)
        },
        error => {
          event.sender.send(`${channel}__error`, error)
        }
      )
    })
  } else {
    ipcMain.on(channel, (event, data) => {
      handle(
        event,
        data,
        res => {
          event.returnValue = res
        },
        error => {
          event.sender.send(`${channel}__error`, error)
        }
      )
    })
  }
}
