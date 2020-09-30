const fs = require('fs')

function saveFileText (file, text) {
  return new Promise((resolve, reject) => {
    const ws = fs.createWriteStream(file)

    ws.on('close', () => {
      resolve()
    }).on('error', error => {
      reject(error)
    })

    ws.write(text)
  })
}

export default saveFileText
