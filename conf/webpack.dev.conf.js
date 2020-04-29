const webpack = require("webpack");
const merge = require("webpack-merge");
const baseWebpackConfig = require("./webpack.base.conf");

const devWebpackConfig = merge(baseWebpackConfig, {
    mode: "development",
    devtool: "cheap-module-eval-source-map",
    devServer: {
        contentBase: baseWebpackConfig.externals.path.dist,
        host: '0.0.0.0',
        bonjour: true,
        disableHostCheck: true,
        port: 8080,
        open: 'Safari',
        overlay: {
            warnings: true,
            errors: true
        }
    },
    plugins: [
        new webpack.SourceMapDevToolPlugin({
            filename: "[file].map"
        })
    ]
});

module.exports = new Promise((resolve, reject) => {
    resolve(devWebpackConfig);
})