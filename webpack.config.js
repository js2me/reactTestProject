const {resolve} = require('path');
const webpack = require('webpack');
const validate = require('webpack-validator');
const {getIfUtils, removeEmpty} = require('webpack-config-utils');

module.exports = env => {
    const {ifProd, ifNotProd} = getIfUtils(env)

    return validate({
        entry: './app/app.js',
        context: __dirname,
        output: {
            path: resolve(__dirname, './build'),
            filename: 'bundle.js',
            publicPath: '/build/',
            pathinfo: ifNotProd(),
        },
        devtool: ifProd('source-map', 'eval'),
        devServer: {
            port: 8080,
            host:'0.0.0.0',
            historyApiFallback: true
        },
        module: {
            loaders: [
                {test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'},
                {test: /\.css$/, loader: 'style-loader!css-loader'},
                // {
                //     test: /\.css$/,
                //     loader: [
                //     'isomorphic-style-loader',
                //     `css-loader?${JSON.stringify({
                //         importLoaders: 1,
                //         sourceMap: ifProd(false,true),
                //         modules: true,
                //         localIdentName:ifProd('[hash:base64:5]','[name]-[local]-[hash:base64:5]'),
                //         minimize: ifProd(true,false),
                //         discardComments: {removeAll: true},
                //     })}`,
                //     'postcss-loader?pack=default',
                //     ]
                // },
                {test: /(\.eot|\.woff2|\.woff|\.ttf|\.svg)/, loader: 'file-loader'},
            ],
        },
        plugins: removeEmpty([
            ifProd(new webpack.optimize.DedupePlugin()),
            ifProd(new webpack.LoaderOptionsPlugin({
                minimize: true,
                debug: false,
                quiet: true,
            })),
            ifProd(new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: '"production"',
                },
            })),
            ifProd(new webpack.optimize.UglifyJsPlugin({
                sourceMap: true,
                compress: {
                    screw_ie8: true, // eslint-disable-line
                    warnings: false,
                },
            })),
        ])
    });
};
