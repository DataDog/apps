const path = require('path');
const webpack = require('webpack');
const packageJson = require('./package.json');

const config = {
    devtool: 'source-map',
    entry: './src/index.ts',

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader'
            }
        ]
    },
    plugins: [
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

const umdConfig = {
    ...config,
    target: ['web', 'es5'],
    entry: './src/index.ts',
    output: {
        filename: 'ui-extensions-sdk.min.js',
        path: path.resolve(__dirname, 'dist'),
        library: 'DD_SDK',
        libraryTarget: 'umd'
    }
};

const esmConfig = {
    ...config,
    output: {
        filename: 'ui-extensions-sdk-esm.min.js',
        path: path.resolve(__dirname, 'dist')
    }
};

module.exports = [umdConfig, esmConfig];
