var webpack = require('webpack');

module.exports = {
    entry: {
        // main: "./src/classes/CanvasCube.ts",
        main: "./src/main.ts"
    },
    output: {
        path: __dirname,
        filename: "./dist/[name].bundle.js"
    },
    module: {
        loaders: [
            { test: /\.tsx?$/, loader: 'ts-loader' },
            /*{ test: /\.css$/, loader: 'style!css' },
            { test: /\.html$/, loader: 'html-loader' },
            { test: /\.(png|jpg|svg)$/, loader: 'url-loader' }*/
        ]
    },
    plugins: [
        /*new webpack.optimize.UglifyJsPlugin({
          compress: { warnings: false }
        })*/
    ]
};