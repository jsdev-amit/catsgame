var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname,'public');
var APP_DIR = path.resolve(__dirname,'app');



var config = {
    entry: APP_DIR + '/js/index.js',
    devtool: 'inline-source-map',
    output: {
        path: BUILD_DIR,
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                use: [
                    'babel-loader'
                ],
            }
        ]
    }
};


module.exports = config;