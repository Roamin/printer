const fs = require('fs')

function getFileText (file, length = Infinity) {
  return new Promise((resolve, reject) => {
    const res = fs.createReadStream(file, { start: 0, end: length * 3 })
    let data = ''

    res
      .on('data', chunk => {
        data += chunk
      })
      .on('end', () => {
        resolve(data.slice(0, length))
      })
      .on('error', error => {
        reject(error)
      })
  })
}

export default getFileText
