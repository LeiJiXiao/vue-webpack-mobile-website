const env = process.env.NODE_ENV;
console.log("process.env.NODE_ENV 的值是(webpack.config.prod.js)："+ process.env.NODE_ENV);

if ( env === 'develop' ) {
    module.exports = require( "./build/webpack.dev" );
    console.log( `node-build-config ===>webpack.dev` );
} else if ( env === 'production' ) {
    module.exports = require( "./build/webpack.pro" );
    console.log( `node-build-config ===>webpack.pro` );
}
