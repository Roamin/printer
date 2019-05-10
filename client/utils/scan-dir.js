const fs = require('fs')
const path = require('path')

function scanDir(dir) {
  const files = fs.readdirSync(dir)
  let tree = []

  files.forEach(file => {
    const filePath = path.join(dir, file)
    const stats = fs.statSync(filePath)
    const { ext, base, name } = path.parse(filePath)
    const node = {
      path: filePath,
      name,
      base,
      ext,
      isDir: stats.isDirectory()
    }

    if (node.isDir) {
      node.dir = scanDir(filePath)
    }

    tree.push(node)
  })

  return tree
}

module.exports = scanDir
