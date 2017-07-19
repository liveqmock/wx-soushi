/**
 * Created by songyingchun on 2017/7/19.
 */
const path = require('path');
const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');
const cleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: {
        main: './src/main.js'
    },
    output: {
        path: path.resolve(__dirname, 'dev'),
        filename: '[name].[hash:8].js'
    },
    devServer: {
        hot: true,
        inline: true,
        port: 8080,
    },
    devtool: 'source-map',
    module: {
        rules: [{
            test: /\.vue$/,
            include: /src/,
            use: [{
                loader: 'vue-loader',
                options: {
                    loaders: {
                        scss: 'vue-style-loader!css-loader!sass-loader',
                        sass: 'vue-style-loader!css-loader!sass-loader'
                    }
                }
            }],
        }, {
            test: /\.js$/,
            exclude: /node_modules/,
            include: /src/,
            enforce: 'pre',
            use: [{
                loader: 'babel-loader'
            }, {
                loader: 'eslint-loader'
            }]
        }]
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.common.js'
        }
    },
    plugins: [
        new htmlWebpackPlugin({
            template: 'index.html',
            filename: 'index.html',
            inject: 'body'
        }),
        new cleanWebpackPlugin([path.resolve(__dirname, 'dev')]),
        new webpack.HotModuleReplacementPlugin()
    ]
}
