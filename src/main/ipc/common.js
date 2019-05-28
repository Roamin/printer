// import path from 'path'

import getFileMd5 from '@/utils/get-file-md5'

import Uploader from '@/utils/uploader'
import ipcRegister from '@/utils/ipc-register'

ipcRegister('common.saveImage', (event, images, resolve, reject) => {
  // const savePath = path.join(__static, './images', `${Date.now()}.png`)

  getFileMd5(images)
    .then(hash => {
      resolve(hash)
    })
    .catch(error => {
      reject(error)
    })
})

ipcRegister('common.uploadImage', (event, images, resolve, reject) => {
  const imagePathList = images.map(item => item.path)
  const uploader = new Uploader(imagePathList, event.sender)

  uploader
    .upload()
    .then(uploadedImages => {
      resolve(uploadedImages)
    })
    .catch(error => {
      reject(error)
    })
})
