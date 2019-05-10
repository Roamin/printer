const path = require('path')
const { ipcMain } = require('electron')

import api from '../api'
const scanDir = require('../utils/scan-dir')

ipcMain.on(api.repository.getInfo, (event, arg) => {
  const files = scanDir(path.join(__dirname, '../../repository/'))

  event.sender.send(`${api.repository.getInfo}__reply`, files)
})
