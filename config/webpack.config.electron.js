'use strict'

const webpack = require('webpack')
const path = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const paths = require('./paths')

console.log('output = ', path.resolve(__dirname, '../'))

module.exports = {
  entry: paths.appMainEntry,
  output: {
    path: path.resolve(__dirname, '../'),
    filename: 'main.js'
  },
  resolve: {
    extensions: ['.js', '.ts', '.json']
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        include: paths.appMain,
        use: [
          {
            loader: require.resolve('ts-loader'),
            options: {
              // disable type checker - we will use it in fork plugin
              transpileOnly: true
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV':
        JSON.stringify(process.env.NODE_ENV) || 'production'
    })
  ],
  node: {
    __dirname: false,
    __filename: false
  },
  target: 'electron-main'
}
