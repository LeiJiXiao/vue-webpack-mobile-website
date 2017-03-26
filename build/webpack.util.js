const path = require( "path" );
const root = path.resolve( __dirname, ".." );//.. 解析到绝对路径

function roots( ...args ){
    return path.join.apply( path, [ root ].concat( args ) );
}

exports.roots = roots;