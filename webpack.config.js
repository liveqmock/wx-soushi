/**
 * Created by songyingchun on 2017/7/19.
 */
const path = require("path");
const webpack = require("webpack");
const htmlWebpackPlugin = require("html-webpack-plugin");
const cleanWebpackPlugin = require("clean-webpack-plugin");
// const px2rem = require("postcss-px2rem");

module.exports = {
    entry: {
        main: "./src/main.js"
    },
    output: {
        path: path.resolve(__dirname, "dev"),
        filename: "[name].[hash:8].js"
    },
    devServer: {
        hot: true,
        inline: true,
        port: 9000,
    },
    devtool: "source-map",
    module: {
        rules: [{
            test: /\.vue$/,
            include: /src/,
            use: [{
                loader: "vue-loader",
                options: {
                    loaders: {
                        scss: "vue-style-loader!css-loader!postcss-loader!sass-loader",
                        sass: "vue-style-loader!css-loader!postcss-loader!sass-loader"
                    }
                }
            }],
        }, {
            test: /\.js$/,
            exclude: /node_modules/,
            include: /src/,
            enforce: "pre",
            use: [{
                loader: "babel-loader"
            }, {
                loader: "eslint-loader"
            }]
        }, {
            test: /\.css$/,
            exclude: /node_modules/,
            include: /src/,
            use: [{
                loader: "style-loader"
            }, {
                loader: "css-loader"
            }]
        }, {
            test: /\.(sass|scss)$/,
            exclude: /node_modules/,
            include: /src/,
            use: [{
                loader: "style-loader"
            }, {
                loader: "css-loader"
            }, {
                loader: "postcss-loader"
            }, {
                loader: "sass-loader"
            }]
        }, {
            test: /\.(jpg|jpeg|png|svg|gif)$/,
            exclude: /node_modules/,
            include: /src/,
            use: [{
                loader: "url-loader",
                options: {
                    limit: 8192,
                    mimetype: "image/png",
                    prefix: "img"
                }
            }]
        }]
    },
    resolve: {
        extensions: [".vue", ".js", ".json", ".sass", ".scss", ".css", ".less", ".jsx"],
        alias: {
            "vue$": "vue/dist/vue.common.js",
            "src": path.resolve(__dirname, "src")
        }
    },
    plugins: [
        new htmlWebpackPlugin({
            template: "index.html",
            filename: "index.html",
            inject: "body"
        }),
        new cleanWebpackPlugin([path.resolve(__dirname, "dev")]),
        new webpack.HotModuleReplacementPlugin()
    ]
};