//process.env.NODE_ENV = 'production';
const webpack = require( "webpack" );
const webpackMerge = require( "webpack-merge" );
const ExtractTextPlugin = require( "extract-text-webpack-plugin" );
const webpackUtil = require( "./webpack.util" );
const webpackCommon = require( "./webpack.common" );
const ImageminPlugin = require( 'imagemin-webpack-plugin' ).default;
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = webpackMerge( webpackCommon, {
    devtool: "source-map",
    output: {
        path: webpackUtil.roots( "dist" ),
        publicPath: "/",
        filename: "js/[name].[chunkHash].js",
        chunkFilename: "[name].[chunkHash].js"
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                exclude: /node_modules/,
                include: webpackUtil.roots( 'src/views' ),
                use: [
                    {
                        loader: "vue-loader",
                        options: {
                            loaders: {
                                css: ExtractTextPlugin.extract( {
                                    use: ["css-loader" ]
                                } ),
                                sass: ExtractTextPlugin.extract( {
                                    use: [ "css-loader", "postcss-loader", "sass-loader" ]
                                } )
                            }
                        }
                    }
                ]
            }, {
                test: /\.(scss|css)$/,
                use: ExtractTextPlugin.extract( [
                    {
                        loader: "css-loader",
                        options: {
                            importLoaders: 1
                        }
                    },
                    "postcss-loader",
                    "sass-loader"
                ] )
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin( {
            'process.env.NODE_ENV': JSON.stringify( 'production' )
        } ),
        new ExtractTextPlugin( {
            filename: "stylesheets/[name].[hash].css",
            allChunks: true
        } ),
        new webpack.NoEmitOnErrorsPlugin(),
        //new webpack.optimize.DedupePlugin(),
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
        } ),
        new CleanWebpackPlugin(
            [   //匹配删除的文件
                'dist'
            ],
            {
                root: webpackUtil.roots(),  //根目录
                verbose:  true,        　　　//开启在控制台输出信息
                dry:      false　　　        //启用删除文件
            } )
    ]
} );