import fs from 'fs'
import request from 'request'
import path from 'path'
import crypto from 'crypto'

import ipcRegister from '@/utils/ipc-register'

const IMG_DIR = path.join(__static, './images')
const TMP_DIR = path.join(IMG_DIR, 'tmp')

let tmpIdCounter = 0

function getTmpId () {
  return tmpIdCounter++
}

function renameImage (tmpPath, fileHash, ext) {
  const imgPath = path.join(IMG_DIR, `${fileHash}${ext}`)

  return new Promise((resolve, reject) => {
    if (fs.existsSync(imgPath)) {
      fs.unlink(tmpPath, error => {
        if (error) return reject(error)

        resolve(path.relative(path.resolve(__static, '../'), imgPath))
      })
    } else {
      fs.rename(tmpPath, imgPath, error => {
        if (error) return reject(error)

        resolve(path.relative(path.resolve(__static, '../'), imgPath))
      })
    }
  })
}

ipcRegister(
  'common.saveImage',
  (event, { type, data, ext = '.png' }, resolve, reject) => {
    const tmpId = getTmpId()

    if (type === 'base64') {
      const md5sum = crypto.createHash('md5')
      const tmpPath = path.join(TMP_DIR, `${tmpId}${ext}`)
      const base64 = data.replace(/^data:image\/\w+;base64,/, '')
      const buffer = Buffer.from(base64, 'base64')
      const hash = md5sum.update(buffer).digest('hex')

      fs.writeFile(tmpPath, buffer, error => {
        if (error) return reject(error)
        renameImage(tmpPath, hash, ext)
          .then(resolve)
          .catch(reject)
      })
    } else if (type === 'url') {
      const ext = path.extname(data)
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
  }
)

ipcRegister(
  'common.uploadImage',
  (event, { filename, filePath }, resolve, reject) => {
    const tmpId = getTmpId()
    const ext = path.extname(filePath)
    const tmpPath = path.join(TMP_DIR, `${tmpId}${ext}`)
    const md5sum = crypto.createHash('md5')
    const rs = fs.createReadStream(filePath)
    const ws = fs.createWriteStream(tmpPath)
    let hash = ''

    console.log(filename, tmpPath)

    ws.on('close', () => {
      console.log(hash)
      renameImage(tmpPath, hash, ext)
        .then(resolve)
        .catch(reject)
    }).on('error', error => {
      reject(error)
    })

    rs.on('data', chunk => {
      md5sum.update(chunk)
    })
      .on('end', () => {
        hash = md5sum.digest('hex')
      })
      .pipe(ws)
  }
)
