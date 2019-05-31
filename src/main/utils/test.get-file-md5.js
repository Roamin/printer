const fs = require('fs')
const crypto = require('crypto')

function getFileMd5 (path) {
  return new Promise((resolve, reject) => {
    const md5sum = crypto.createHash('md5')
    const stream = fs.createReadStream(path)

    stream.on('data', chunk => {
      md5sum.update(chunk)
    })

    stream.on('end', () => {
      const hash = md5sum.digest('hex')

      resolve(hash)
    })

    stream.on('error', error => {
      reject(error)
    })
  })
}

getFileMd5('./get-file-md5.js')
  .then(res => {
    console.log(res)
  })
  .catch(error => {
    console.error(error)
  })
