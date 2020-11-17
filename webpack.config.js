const path = require('path');
const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
module.exports = {
    mode: 'development',
    entry: path.join(__dirname, './src/main.js'),
    output: {
        path: path.join(__dirname, './dist'),
        filename: 'bundle.js'
    },
    devServer: {
        open: true,
        contentBase: 'src',
        hot: true,
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new htmlWebpackPlugin({
            template: path.join(__dirname, './public/index.html'),
            filename: "index.html"
        }),
        new VueLoaderPlugin(),
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }, {
                test: /\.(jpg|png|git|jpeg)$/,
                use: 'url-loader?limit=10240&name=[name].[ext]&esModule=false',
            }, {
                test: /\.(ttf|eot|svg|woff|woff2)$/,
                use: 'url-loader'
            }, {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: /node_modules/
            }, {
                test: /\.vue$/,
                use: 'vue-loader',
            }
        ]
    }
}