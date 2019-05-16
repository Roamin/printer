const fs = require('fs')

function readLine (file, length) {
  return new Promise((resolve, reject) => {
    const res = fs.createReadStream(file, { start: 0, end: length * 3 })
    let data = ''

    res.on('data', chunk => {
      data += chunk
    })
    res.on('end', () => {
      console.log(data.slice(0, length))
    })
  })
}

readLine('../../../static/repository/roam/blog/文学/盗墓笔记.md', 100).then(
  data => {
    console.log(data)
  }
)
