const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const packageJson = require('./package.json');

module.exports = (env, options) => {
    const config = {
        devtool: 'source-map',
        target: ['web', 'es5'],
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

    if (options.mode === 'production') {
        config.plugins.push(new CleanWebpackPlugin());
    }

    return config;
};
