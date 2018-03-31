const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
	entry: {
		index: './view/src/js/index.js'
	},
	plugins: [
		new CleanWebpackPlugin(['dist'])
	],
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, 'dist')
	}
};