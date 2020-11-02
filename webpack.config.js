const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

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
    plugins: [new CleanWebpackPlugin()],
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
