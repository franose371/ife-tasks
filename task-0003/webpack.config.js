const path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: "./src/js/script.js",
	output: {
		path: path.resolve(__dirname, './dist'),
		filename: 'js/bundle.js'
	},

	plugins: [
		new HtmlWebpackPlugin({
			filename: "test.html",
			template: "src/index.html"
		})
	]
};