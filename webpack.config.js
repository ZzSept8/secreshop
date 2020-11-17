const path = require('path');
const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const MiniCssExtract = require('mini-css-extract-plugin');
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
        new MiniCssExtract({
            // 从 .js文件中提出出来.css文件的名称  放入到dist下的css文件目录下
            filename: "css/[name]_[contenthash:8].css",  // 生成后放到 dist/css   原来的css文件名 加上 8位随机生成的hash数值
            chunkFilename: "[id].css"
        }),
        new VueLoaderPlugin(),
    ],
    module: {
        rules: [
           
            // {
            //     test: /\.css$/,
            //     use: ['style-loader', 'css-loader']
            // },
            {
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
            },
            //打包出css文件
            //
            {
                test: /\.css$/,
                use: [MiniCssExtract.loader, 'css-loader']
            },
            //
        ]
    }
}