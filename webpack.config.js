/* webpack.config.js
 * @ fuyiyang
 */
// const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
    entry: {
        app: ['./src/entry.js']
    },
    output: {
        filename: 'static/[name].js?[hash:6]',
        path: path.resolve(__dirname)
    },
    devServer: {
        contentBase: path.resolve(__dirname),
        historyApiFallback: true,
		host: '127.0.0.1',
		port: 7000,
		inline: true,
		hot: true,
		compress: true,
		overlay: true,
		open: true,
		disableHostCheck: true,
	},
    plugins: [
       
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
            inject: 'head',
            minify: {
                collapseWhitespace: true,
                minifyJS: true,
                minifyCSS: true
            }
        })
    ],
    module: {
        rules: [
            {
                test: /\.html$/,
                use: 'html-loader'
            },
            {
                test: /\.(less|css)$/,
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader?minimize' },
                    { loader: 'postcss-loader' },
                    { loader: 'less-loader' }
                ]
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            name: 'static/[name].[ext]?[hash:6]'
                        }
                    },
                    { // 压缩图片：https://github.com/tcoopman/image-webpack-loader
                        loader: 'image-webpack-loader',
                        options: {
                            bypassOnDebug: true
                        }
                    }
                ]
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 8192,
                        name: 'static/[name].[ext]?[hash:6]'
                    }
                }
            }
        ]
    }
};
