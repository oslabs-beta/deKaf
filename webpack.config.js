const path = require('path');

module.exports = {

    // mode set to currect process
    mode: process.env.NODE_ENV,
    //entry point for compiling
    entry: './src/index.js',
    output: {
        //path to our build directory
        path: path.resolve(__dirname, 'build'),
        //compiled program file name
        filename: 'bundle.js',
    },
    devServer: {
        publicPath: '/build',
        // Requests proxied to localhost:3000 when in dev build
        proxy: {
            "/": "http://localhost:3000"
        },
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    // Translates React to js
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env','@babel/preset-react']
                    }
                }
            },
            {
                test: /\.css$/i,
                exclude: /node_modules/,
                use: [
                  // Creates `style` nodes from JS strings
                  "style-loader",
                  // Translates CSS into CommonJS
                  "css-loader"
                ],
            },
            {
                test: /\.(gif|png|jpe?g|svg)$/i,
                use: {
                    // Compiles images, if we want to use a logo later on
                    loader: 'file-loader',
                    }
              }
        ]
    }
}