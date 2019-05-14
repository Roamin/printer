import path from 'path'

import scanDir from '@/utils/scan-dir'
import ipcRegister from '@/utils/ipc-register'

ipcRegister('repository.getList', (event, data, send) => {
  const files = scanDir(path.join(__static, './repository/roam'))

  send(files)
})

ipcRegister('repository.getCategoryList', (event, data, send) => {
  const files = scanDir(path.join(__static, './repository/roam/blog'))

  send(files)
})

ipcRegister('repository.getArticleList', (event, data, send) => {
  const files = scanDir(data)

  send(files)
})
