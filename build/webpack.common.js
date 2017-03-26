const webpack = require( "webpack" );
const webpackUtil = require( "./webpack.util" );
const htmlWebpackPlugin = require( "html-webpack-plugin" );
const ExtractTextPlugin = require( "extract-text-webpack-plugin" );
const autoprefixer = require( "autoprefixer" );
let files = [ "index" ];
let entrys = {};
let views = [];

/**
 *
 * @type 入口文件处理
 */
entrys[ "vendor" ] = [ "vue", "vue-router", "vuex", "element-ui" ];
for( let i = 0; i < files.length; i++ ){
    /**
     *
     * main-html生成
     */
    let arr = [ files[ i ], "vendor" ];
    views.push( new htmlWebpackPlugin( {
        template: `./${ files[ i ] }.html`,
        filename: `${ files[ i ] }.html`,
        /**
         * 生成的页面加入第三方依赖库
         */
        chunks: arr
    } ) );
    /**
     * 入口js配置
     */
    entrys[ files[ i ] ] = `./src/${ files[ i ] }.js`;
}

module.exports = {
    entry: entrys,
    resolve: {
        extensions: [ ".scss", ".js", ".vue" ],
        alias: {
            //npm中安装vue默认为运行时构建，故不能使用template模板，此配置修改运行时构建。
            "vue$": "vue/dist/vue.common.js"
        }
    },
    module: {
        rules: [
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            limit: 10000,
                            name: webpackUtil.roots( "src/theme-default/fonts/[name].[ext]" )
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            limit: 10000,
                            name: webpackUtil.roots( "src/images/[name].[ext]" )
                        }
                    }
                ]
            },
            {
                test: /\.scss$/,
                include: webpackUtil.roots( "src/sass" ),
                use: ExtractTextPlugin.extract( [
                    {
                        loader: "css-loader",
                        options: {
                            importLoaders: 2
                        }
                    },
                    "postcss-loader",
                    "sass-loader"
                ] )
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            presets: [
                                "es2015",
                                "stage-0"
                            ]
                        }
                    }
                ]
            },
            {
                test: /\.vue$/,
                use: [
                    {
                        loader: "vue-loader",
                        options: {
                            loaders: {
                                css: ExtractTextPlugin.extract( [
                                    "css-loader","postcss-loader"
                                ] ),
                                sass: ExtractTextPlugin.extract( [
                                    "css-loader","postcss-loader","sass-loader"
                                ] )
                            }
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.LoaderOptionsPlugin( {
            options: {
                postcss(){
                    return [
                        autoprefixer()
                    ]
                }
            }
        } ),
        process.env.NODE_ENV === 'develop' ?
            new webpack.optimize.CommonsChunkPlugin( {
                name: "vendor",
                filename: "vendor.js"
            } ) :
            new webpack.optimize.CommonsChunkPlugin( {
                name: "vendor",
                filename: "vendor.[hash].js"
            } ),
        process.env.NODE_ENV === 'develop' ?
            new ExtractTextPlugin( "stylesheets/[name].css" ) :
            new ExtractTextPlugin( "stylesheets/[name].[hash].css" )
    ].concat( views )
}