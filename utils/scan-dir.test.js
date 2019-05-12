const scanDir = require('./scan-dir')
const path = require('path')

console.log(
  JSON.stringify(scanDir(path.join(__dirname, '../../repository')), null, 4)
)
