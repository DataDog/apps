const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const packageJson = require('./package.json');

module.exports = {
    devtool: 'source-map',
    entry: './src/index.ts',
    output: {
        filename: 'ui-apps-sdk.min.js',
        path: path.resolve(__dirname, 'dist'),
        library: 'DD_SDK',
        libraryTarget: 'umd'
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader'
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new webpack.DefinePlugin({
            SDK_VERSION: JSON.stringify(packageJson.version)
        })
    ],
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    devServer: {
        clientLogLevel: 'warning',
        open: true,
        historyApiFallback: true,
        stats: 'errors-only'
    }
};
