const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');

module.exports = merge(common, {
	devtool: 'inline-source-map',
	devServer: {
		contentBase: './',
		hot: true,
		port: 8080,
		before: app => {
			app.post('/api/upload', function (req, res) {
				res.json({
					code: 200,
					data: 'https://assets-cdn.github.com/images/modules/marketplace/mpft-icon.svg'
				});
			});
		}
	},
	plugins: [
		new webpack.NamedModulesPlugin(),
		new webpack.HotModuleReplacementPlugin()
	]
});