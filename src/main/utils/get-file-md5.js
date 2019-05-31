import fs from 'fs'
import crypto from 'crypto'

export default function (path) {
  return new Promise((resolve, reject) => {
    const md5sum = crypto.createHash('md5')
    const stream = fs.createReadStream(path)

    stream.on('data', chunk => {
      md5sum.update(chunk)
    })

    stream.on('close', () => {
      const hash = md5sum.digest('hex')

      resolve(hash)
    })

    stream.on('error', error => {
      reject(error)
    })
  })
}
