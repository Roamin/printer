const fs = require('fs')
const path = require('path')
const { ipcMain } = require('electron')

function walk(dir) {
  const files = fs.readdirSync(dir)
  let results = []

  files.forEach(file => {
    const filePath = path.join(dir, file)
    const stats = fs.statSync(filePath)

    if (stats.isFile()) {
      const { ext, base, name } = path.parse(filePath)

      results.push({
        file: filePath,
        name,
        base,
        ext
      })
    } else if (stats.isDirectory()) {
      results = results.concat(walk(filePath))
    }
  })

  return results
}

function getArticleFileList(dir) {
  return walk(dir)
}

ipcMain.on('sync-account', (event, arg) => {
  const files = getArticleFileList(path.join(__dirname, '../source/_drafts'))

  event.sender.send('sync-account-reply', files)
})
