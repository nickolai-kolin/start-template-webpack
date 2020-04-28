const path = require('path');
const fs = require('fs');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PATHS = {
    src: path.join(__dirname, '../src'),
    dist: path.join(__dirname, '../dist'),
    assets: 'assets/'
}
const PAGES_DIR = `${PATHS.src}/pug/pages/`;
console.log(PAGES_DIR)
const PAGES = fs.readdirSync(PAGES_DIR).filter(fileName => fileName.endsWith('.pug'))


module.exports = {
    externals: {
        path: PATHS
    },
    entry: {
        app: PATHS.src
    },
    output: {
        filename: `${PATHS.assets}js/[name].js`,
        path: PATHS.dist,
        publicPath: ''
    },
    module: {
        rules: [
            { test: /\.js$/, exclude: "/node-modules/", loader: ["babel-loader"] },
            { test: /\.pug$/, loader: ["pug-loader"] },
            {
                test: /\.(png|jpg|gif|svg|jpeg)$/,
                use: [
                    { loader: 'file-loader', options: { name: '[name].[ext]' } },
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    MiniCssExtractPlugin.loader,
                    { loader: 'css-loader', options: { sourceMap: true, url: false } },
                    { loader: 'postcss-loader', options: { sourceMap: true, config: { path: `${PATHS.src}/js/postcss.config.js` } } },
                    { loader: 'sass-loader', options: { sourceMap: true } }
                ]
            },
            {
                test: /\.css$/, use: [
                    'style-loader',
                    MiniCssExtractPlugin.loader,
                    { loader: 'css-loader', options: { sourceMap: true, url: false } },
                    { loader: 'postcss-loader', options: { sourceMap: true, config: { path: `${PATHS.src}/js/postcss.config.js` } } },
                    { loader: 'sass-loader', options: { sourceMap: true } }
                ]
            },
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: `${PATHS.assets}css/[name].css`,
        }),
        new CopyWebpackPlugin([
            { from: `${PATHS.src}/img`, to: `${PATHS.assets}img/` },
            { from: `${PATHS.src}/static`, to: `` }
        ]),
        ...PAGES.map(page => new HtmlWebpackPlugin({
                hash: false,
                template: `${PAGES_DIR}/${page}`,
                filename: `./${page.replace(/\.pug/, '.html')}`
            })
        )
    ],
}