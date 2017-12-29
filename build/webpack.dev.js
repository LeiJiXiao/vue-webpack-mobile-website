//process.env.NODE_ENV = 'develop';
const webpack = require( "webpack" );
const webpackMerge = require( "webpack-merge" );
const ExtractTextPlugin = require( "extract-text-webpack-plugin" );
const webpackCommon = require( "./webpack.common" );
const webpackUtil = require( "./webpack.util" );

module.exports = webpackMerge( webpackCommon, {
    devtool: "source-map",
    output: {
        path: webpackUtil.roots( "dist" ),
        publicPath: "/",
        filename: `js/[name].js`,
        chunkFilename: "[name].js"
    },
    module: {
        rules: [
            {
                test: /\.(scss|css)$/,
                use: [
                    'style-loader',  //Hot Module Replacement enabled use 'style-loader'
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1
                        }
                    },
                    'postcss-loader',
                    'sass-loader'
                ]
            }, {
                test: /\.vue$/,
                exclude: /node_modules/,
                include: webpackUtil.roots( 'src/views' ),
                use: [
                    {
                        loader: "vue-loader",
                        options: {
                            loaders: {
                                css: [ 'style-loader', "css-loader" ],
                                sass: [ 'style-loader', "css-loader", "postcss-loader", "sass-loader" ]
                            }
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin( {
            'process.env.NODE_ENV': JSON.stringify( 'develop' )
        } ),
        //new ExtractTextPlugin( {
        //filename: "stylesheets/[name].css",
        //allChunks: true //true从所有其他的块中提取,默认情况下，它只从初始块中提取(按需加载的情况需要注意)
        //} )
    ],
    devServer: {
        open: true,
        historyApiFallback: true,
        stats: 'minimal',
        hot: true,
        host: '127.0.0.1',
        port: 8080,
        disableHostCheck: true,
        proxy: {
            '/apis': {
                target: 'http://',
                pathRewrite: { '^/apis' : '' },
                changeOrigin: true,
                secure: false,
            }
        }
    }
} );
