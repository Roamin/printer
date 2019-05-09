const fs = require('fs')
const { ipcMain } = require('electron')

function walk(dir) {
  const list = fs.readdirSync(dir)
  let results = []

  list.forEach(function(file) {
    file = dir + '/' + file
    const stat = fs.statSync(file)

    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file))
    } else {
      results.push(file)
    }
  })

  return results
}

function syncAccount() {
  // todo

  return []
}

function syncFiles(dir) {
  const files = walk(dir)

  console.log(files)
}

ipcMain.on('sync-files', () => {
  syncFiles('../source/_drafts')
})
