import fs from 'fs'
import request from 'request'
import path from 'path'
import crypto from 'crypto'

import Uploader from '@/utils/uploader'
import ipcRegister from '@/utils/ipc-register'

const IMG_DIR = path.join(__static, './images')
const TMP_DIR = path.join(IMG_DIR, 'tmp')

let tmpId = 0

function renameImage (tmpPath, fileHash, ext) {
  const imgPath = path.join(IMG_DIR, `${fileHash}${ext}`)
  console.log(tmpPath)

  return new Promise((resolve, reject) => {
    if (fs.existsSync(imgPath)) {
      fs.unlink(tmpPath, error => {
        if (error) return reject(error)

        resolve(imgPath)
      })
    } else {
      fs.rename(tmpPath, imgPath, error => {
        if (error) return reject(error)

        resolve(imgPath)
      })
    }
  })
}

ipcRegister('common.saveImage', (event, { type, data }, resolve, reject) => {
  tmpId += 1

  if (type === 'base64') {
    const md5sum = crypto.createHash('md5')
    const tmpPath = path.join(TMP_DIR, `${tmpId}.png`)
    const base64 = data.replace(/^data:image\/\w+;base64,/, '')
    const buffer = Buffer.from(base64, 'base64')
    const hash = md5sum.update(buffer).digest('hex')

    fs.writeFile(tmpPath, buffer, error => {
      if (error) return reject(error)
      renameImage(tmpPath, hash, '.png')
        .then(resolve)
        .catch(reject)
    })
  } else {
    console.log('url')
    const { ext } = path.parse(data)
    const md5sum = crypto.createHash('md5')
    const tmpPath = path.join(TMP_DIR, `${tmpId}${ext}`)
    const ws = fs.createWriteStream(tmpPath)
    let hash = ''

    ws.on('close', () => {
      renameImage(tmpPath, hash, ext)
        .then(resolve)
        .catch(reject)
    }).on('error', error => {
      reject(error)
    })

    request(data)
      .on('data', chunk => {
        md5sum.update(chunk)
      })
      .on('end', () => {
        hash = md5sum.digest('hex')
      })
      .pipe(ws)
  }
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
