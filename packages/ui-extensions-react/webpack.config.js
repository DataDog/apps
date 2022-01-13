const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = (env, options) => {
    const config = {
        devtool: 'source-map',
        target: ['web', 'es5'],
        entry: './src/index.ts',
        output: {
            filename: 'ui-extensions-react.min.js',
            path: path.resolve(__dirname, 'dist'),
            library: 'DD_REACT',
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
        plugins: [],
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
