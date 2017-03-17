const webpack = require('webpack');
// builtin node path module
const path = require('path');

const node_env = process.env.NODE_ENV || 'dev';

module.exports = {
	devtool: node_env == 'prod' ? false : "#source-map",
	target: "node",
	cache: false,
	context: __dirname,
	resolve: {
		alias: {
			"~": path.join(__dirname, './app')
		},
		extensions: ['.js', '.jsx']
	},
	entry: path.join(__dirname, 'server.js') ,
	output: {
		path: path.join(__dirname, './build'),
		filename: 'server.js',
	},
	module: {
		loaders: [ 
		{
			test: /\.jsx*$/,
			exclude: /(node_modules|bower_components)/,
			loaders: ["babel-loader?presets[]=es2015&presets[]=stage-0&presets[]=react"]
		}, {
			test: /\.scss$/,
			loader: 'css-loader/locals?modules&loacalIdentName=[name]--[local]--[hash:base64:5]!sass-loader'
        }]
	},
	plugins: [
		new webpack.DefinePlugin({
            // http://stackoverflow.com/a/35372706/2177568
            // for server side code, just require, don't chunk
            // use `if (ONSERVER) { ...` for server specific code
            ONSERVER: true
        })
	],
}
