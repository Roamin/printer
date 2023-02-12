const path = require('path')

function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: './',
  pages: {
    index: {
      entry: 'src/renderer/index.js'
    }
  },
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src/renderer'))
      .set('common', resolve('src/common'))
      .set('assets', resolve('src/renderer/assets'))
      .set('components', resolve('src/renderer/components'))
  },
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,
      mainProcessFile: 'src/main/index.js'
    },
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [
        './src/renderer/styles/_variables.scss',
        './src/renderer/styles/_mixins.scss'
      ]
    }
  }
}
