const webpack = require('webpack');

// builtin node path module
const path = require('path');

// It moves every require('style.css') in entry chunks into a separate css output file.
const ExtractTextPlugin = require('extract-text-webpack-plugin');
// Create html files from the bundle
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const nodeExternals = require('webpack-node-externals');

module.exports = ({ base }) => {
    const nodeEnv = process.env.NODE_ENV || 'development';
    const isProd = nodeEnv === 'production';
    const isClient = base === 'client' ? true : false

    return {
        devtool: isProd ? false : 'eval-source-map',
        mode: isProd ? 'production' : 'development',
        externals: isClient ? [] : [nodeExternals()],

        entry: isClient
            ? { index: path.join(__dirname, './app/index.jsx'), vendor: ['react', 'react-dom'] }
            : { server: path.join(__dirname, 'server.js') },

        output: {
            path: path.join(__dirname, './build'),
            filename: '[name].js',
            publicPath: '/'
        },

        optimization: {
            splitChunks: {
                chunks: 'all'
//                name: 'vendor',
//                minChunks: Infinity,
//                filename: 'vendor.bundle.js'
            },
            removeEmptyChunks: true,
            minimizer: [
                new UglifyJsPlugin({
                    parallel: true,
                    sourceMap: !isProd
                })
            ]
        },

        resolve: {
            alias: {
                '~': path.join(__dirname, './app')
            },
            extensions: ['.js', '.jsx']
        },

        target: isClient ? 'web' : 'node',

        module: {
            rules: [{
                test: /\.jsx?$/,
                loader: 'babel-loader',
                options: {
                    presets: [
                        "@babel/preset-env",
                        "@babel/preset-react",
                    ],
                    plugins: [
                        "@babel/plugin-syntax-dynamic-import"
                    ]
                }
            }, {
                test: /\.(scss|sass)$/,
                use: isClient
                    ? [
                        { loader: 'style-loader' },
                        {
                            loader: 'css-loader',
                            options:
                            {
                                modules: true
                            }
                        },
                        { loader: 'sass-loader' }
                    ]
                    : [
                        {
                            loader: 'css-loader/locals',
                            options:
                            {
                                modules: true,
                                localIdentName: '[name]--[local]--[hash:base64:5]'
                            }
                        },
                        { loader: 'sass-loader' }
                    ]
            }]
        },

        devServer: {
            historyApiFallback: true,
        },

        plugins: isClient ? [
            new webpack.DefinePlugin({
                // http://stackoverflow.com/a/35372706/2177568
                // for server side code, just require, don't chunk
                // use `if (ONSERVER) { ...` for server specific code
                ONSERVER: false,
                'process.env': { NODE_ENV: JSON.stringify(nodeEnv) }
            }),
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
            new MiniCssExtractPlugin({
                // Options similar to the same options in webpackOptions.output
                // both options are optional
                filename: "[name].css",
                chunkFilename: "[id].css"
            })
        ] : [
            new webpack.DefinePlugin({
                // http://stackoverflow.com/a/35372706/2177568
                // for server side code, just require, don't chunk
                // use `if (ONSERVER) { ...` for server specific code
                ONSERVER: true,
                'process.env': { NODE_ENV: JSON.stringify(nodeEnv) }
            })
        ]
    }
}
