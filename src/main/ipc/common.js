import Uploader from '@/utils/uploader'
import ipcRegister from '@/utils/ipc-register'

ipcRegister('common.uploadImage', (event, images, send) => {
  const imagePathList = images.map(item => item.path)
  const uploader = new Uploader(imagePathList, event.sender)

  uploader
    .upload()
    .then(uploadedImages => {
      send(uploadedImages)
    })
    .catch(error => {
      throw Error(error)
    })
})
