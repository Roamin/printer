const fs = require('fs')
const path = require('path')

/**
 * 遍历目录
 * @param {path} dir 需要遍历的目录
 * @param {number} deep 遍历层数
 */
function scanDir (dir, deep = 1) {
  deep--

  const files = fs.readdirSync(dir)
  const tree = []

  files.forEach(file => {
    const filePath = path.join(dir, file)
    const stats = fs.lstatSync(filePath)
    const { ext, base, name } = path.parse(filePath)
    const node = {
      path: filePath,
      name,
      base,
      ext,
      isDir: stats.isDirectory()
    }

    if (stats.isFile()) {
      node.isDir = false

      tree.push(node)
    } else if (stats.isDirectory()) {
      node.isDir = false

      if (deep > 0) node.dir = scanDir(filePath, deep)
      else node.dir = []

      tree.push(node)
    }
  })

  return tree
}
console.log(
  JSON.stringify(scanDir('../../../static/repository/roam/'), null, 4)
)
