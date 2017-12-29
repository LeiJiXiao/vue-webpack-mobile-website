const webpack = require( "webpack" );
const webpackUtil = require( "./webpack.util" );
const htmlWebpackPlugin = require( "html-webpack-plugin" );
const autoprefixer = require( "autoprefixer" );
let files = [ "index" ];
let entrys = {};
let views = [];
/**
 *
 * @type 入口文件处理
 */
//entrys[ 'babel-polyfill' ] = 'babel-polyfill';
for( let i = 0; i < files.length; i++ ){
    /**
     *
     * main-html生成
     */
    //let arr = [ "manifest", files[ i ], "vendor" ];
    views.push( new htmlWebpackPlugin( {
        template: `./${ files[ i ] }.html`,
        filename: `${ files[ i ] }.html`,
        /**
         * 生成的页面加入第三方依赖库
         */
        //chunks: arr
        chunksSortMode: 'dependency'
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
            "vue$": "vue/dist/vue.js",
            '@': webpackUtil.roots( 'src' ),
            'Axios': webpackUtil.roots( 'src/lib/Axios.js' ),
            'Util': webpackUtil.roots( 'src/lib/Util.js' )
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
                            name: "fonts/[name].[hash:8].[ext]"
                        }
                    }
                ]
            }, {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                include: webpackUtil.roots( 'src/images' ),
                exclude: /node_modules/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            limit: 10000,
                            name: 'images/[name].[hash:8].[ext]'
                            //name指定生成后的文件夹，（dist目录下面）
                        }
                    }
                ]
            }, {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "babel-loader"
                    }
                ]
            }
        ]
    },
    plugins: [
        /*new webpack.ProvidePlugin( {
         $: 'jquery'
         } ),*/
        new webpack.optimize.CommonsChunkPlugin( {
            name: 'vendor',
            minChunks ( module, count ) {
                // any required modules inside node_modules are extracted to vendor
                return (
                    module.resource &&
                    /\.js$/.test( module.resource ) &&
                    ( module.resource.indexOf(
                        webpackUtil.roots( 'node_modules' )
                    ) === 0 ||
                    module.resource.indexOf(
                        webpackUtil.roots( 'src/lib' )
                    ) === 0 )
                )
            }
        } ),
        new webpack.optimize.CommonsChunkPlugin( {
            name: 'manifest',
            chunks: [ 'vendor' ]
        } ),
        new webpack.LoaderOptionsPlugin( {
            options: {
                postcss(){
                    return [
                        autoprefixer()
                    ]
                }
            }
        } )
    ].concat( views )
};