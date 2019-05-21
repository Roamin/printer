import path from 'path'

import scanDir from '@/utils/scan-dir'
import getFileText from '@/utils/get-file-text'
import ipcRegister from '@/utils/ipc-register'

ipcRegister('repository.getList', (event, data, send) => {
  const files = scanDir(path.join(__static, './repository/roam'))

  send(files)
})

ipcRegister('repository.getCategoryList', (event, data, send) => {
  const files = scanDir(path.join(__static, './repository/roam/blog'))

  send(files)
})

ipcRegister(
  'repository.getArticleList',
  (event, { path: categoryPath }, send) => {
    const files = scanDir(categoryPath)
    const queen = []

    files.forEach(file => {
      queen.push(getFileText(file.path, 100))
    })

    Promise.all(queen)
      .then(values => {
        const res = files.map((file, index) => {
          return {
            ...file,
            summary: values[index]
          }
        })

        send(res)
      })
      .catch(error => {
        throw Error(error)
      })
  }
)

ipcRegister('repository.getArticle', (event, { path: articlePath }, send) => {
  getFileText(articlePath)
    .then(res => {
      send(res)
    })
    .catch(error => {
      throw Error(error)
    })
})
