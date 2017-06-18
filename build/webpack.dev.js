process.env.NODE_ENV = 'develop';
const webpackMerge = require( "webpack-merge" );
const webpackCommon = require( "./webpack.common" );
const webpackUtil = require( "./webpack.util" );

module.exports = webpackMerge( webpackCommon, {
    devtool: "source-map",
    output: {
        path: webpackUtil.roots( "dist" ),
        publicPath: "/",
        filename: `js/[name].js`
    },
    devServer: {
        open: true,
        historyApiFallback: true,
        stats: 'minimal'
    }

} );
