const webpack = require('webpack');

// builtin node path module
const path = require('path');

// It moves every require("style.css") in entry chunks into a separate css output file.
const ExtractTextPlugin = require('extract-text-webpack-plugin');
// Create html files from the bundle
const HtmlWebpackPlugin = require('html-webpack-plugin');
// Create the favicon
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

const node_env = process.env.NODE_ENV || 'dev';

module.exports = {
	devtool: node_env == 'prod' ? false : "#eval-source-map",
	resolve: {
		alias: {
			"~": path.join(__dirname, './app')
		},
		extensions: ['.js', '.jsx']
	},
	entry: {
		index: [ path.join(__dirname, './app/index.jsx') ],
		vendor: [ 'react', 'react-dom' ]
	},
	output: {
		path: path.join(__dirname, './build'),
		filename: '[name].js',
		publicPath: '/'
	},
	module: {
		loaders: [ 
		{
			test: /\.jsx*$/,
			exclude: /(node_modules|bower_components)/,
			loader: 'babel?presets[]=react,presets[]=es2015,presets[]=stage-0'
		}, {
			test: /\.scss$/,
			loader: 'style!css?modules&loacalIdentName=[name]--[local]--[hash:base64:5]!sass'
		}]
	},
	plugins: [
		new FaviconsWebpackPlugin({
			logo: './app/images/favicon.png',
			prefix: 'icons-[hash]/',
			emitStats: true,
			persisentCache: true,
			background: '#000',
			inject: true
		}),
		new HtmlWebpackPlugin({
			template: 'app/index.html',
			inject: 'body',
			filename: 'index.html'
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor',
			minChunks: Infinity,
			filename: 'vendor.bundle.js' 
		}),
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			},
			output: {
				comments: false
			},
			sourceMap: false
		}),
		new ExtractTextPlugin({
			filename: 'style.css',
			allChunks: true
		}),
                new webpack.LoaderOptionsPlugin({
                    options: {
                        sassLoader: {
                                includePaths: [path.resolve(__dirname, "./node_modules/compass-mixins/lib")]
                        }
                    }
                })
	],
	devServer: {
		historyApiFallback: true,
	},
}
