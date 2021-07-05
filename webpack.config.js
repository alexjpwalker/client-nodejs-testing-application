const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: {
        main: path.resolve(__dirname, './src/index.js'),
    },

    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].bundle.js',
    },

    mode: "development",

    devtool: "inline-source-map",

    devServer: {
        contentBase: "./dist",
    },

    plugins: [
        new HtmlWebpackPlugin({
            title: 'webpack Boilerplate',
            template: path.resolve(__dirname, './src/template.html'), // template file
            filename: 'index.html', // output file
        }),
        // new webpack.ProvidePlugin({
        //     Buffer: ['buffer', 'Buffer'],
        //     process: 'process/browser',
        // }),
    ],

    // resolve: {
    //     alias: {
    //         crypto: "crypto-browserify",
    //         fs: "fs-es6",
    //         http: "stream-http",
    //         os: "os-browserify/browser",
    //         path: "path-browserify",
    //         stream: "stream-browserify",
    //         zlib: "browserify-zlib",
    //     },
    //     fallback: {
    //         "child_process": false,
    //         "dns": false,
    //         "framer": false,
    //         "https": false,
    //         "http2": false,
    //         "tls": false,
    //         "net": false,
    //     }
    // }
}
