import path from 'path'

import scanDir from '../utils/scan-dir'
import getFileText from '../utils/get-file-text'
import saveFile from '../utils/save-file'
import ipcRegister from '../utils/ipc-register'

export default function () {
  ipcRegister('repository.getList', (event, req, resolve, reject) => {
    try {
      const files = scanDir(path.join(__static, './repository/roam'))

      resolve(files)
    } catch (error) {
      reject(error)
    }
  })

  ipcRegister('repository.getCategoryList', (event, req, resolve, reject) => {
    try {
      const files = scanDir(path.join(__static, './repository/roam/blog'))

      resolve(files)
    } catch (error) {
      reject(error)
    }
  })

  ipcRegister(
    'repository.getArticleList',
    (event, { path: categoryPath }, resolve, reject) => {
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

          resolve(res)
        })
        .catch(error => {
          reject(error)
        })
    }
  )

  ipcRegister(
    'repository.getArticle',
    (event, { path: articlePath }, resolve, reject) => {
      getFileText(articlePath)
        .then(res => {
          resolve(res)
        })
        .catch(error => {
          reject(error)
        })
    }
  )

  ipcRegister(
    'repository.saveArticle',
    (event, { path: articlePath, text }, resolve, reject) => {
      console.log(articlePath, text)
      saveFile(articlePath, text)
        .then(res => {
          resolve(res)
        })
        .catch(error => {
          reject(error)
        })
    }
  )
}
