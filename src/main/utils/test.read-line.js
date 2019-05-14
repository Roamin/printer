const fs = require('fs')
const readline = require('readline')

function readLine (file, lines) {
  return new Promise((resolve, reject) => {
    const rl = readline.createInterface({
      input: fs.createReadStream(file),
      crlfDelay: Infinity
    })
    const result = []

    rl.on('line', line => {
      result.push(line)
      lines--

      console.log(lines, lines === 0)

      if (lines === 0) {
        console.log('shutdown')
        rl.close()
      }
    }).on('close', () => {
      resolve(result)
    })
  })
}

readLine('../../../static/repository/roam/blog/文学/盗墓笔记.md', 3).then(
  data => {
    console.log(data)
  }
)
