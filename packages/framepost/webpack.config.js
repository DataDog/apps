const path = require('path');

module.exports = {
    mode: 'production',
    target: ['web', 'es5'],
    devtool: 'source-map',
    entry: './src/index.ts',
    output: {
        filename: 'framepost.min.js',
        path: path.resolve(__dirname, 'dist'),
        library: 'framepost',
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
