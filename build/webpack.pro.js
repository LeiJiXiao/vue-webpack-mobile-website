process.env.NODE_ENV = 'production';
const webpack = require( "webpack" );
const webpackMerge = require( "webpack-merge" );
const webpackUtil = require( "./webpack.util" );
const webpackCommon = require( "./webpack.common" );
const ImageminPlugin = require( 'imagemin-webpack-plugin' ).default;

module.exports = webpackMerge( webpackCommon, {
    devtool: "source-map",
    output: {
        path: webpackUtil.roots( "dist" ),
        publicPath: "/",
        filename: "js/[name].[hash].js"
    },
    plugin: [
        new webpack.NoErrorsPlugin(),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin( {
            compress: {
                warnings: false
            },
            sourceMap: true,//可以在线上生成soucemap文件，便于调试
            mangle: true
        } ),
        new ImageminPlugin( {
            test: 'images/**',
            pngquant: {
                quality: '60-90'
            },
            gifsicle: {
                optimizationLevel: 3
            }
        } )
    ]
} );