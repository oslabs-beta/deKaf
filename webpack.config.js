const path = require('path');

module.exports = {

    // mode set to currect process
    mode: process.env.NODE_ENV,
    //entry point for compiling
    entry: './src/index.tsx',
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
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: {
                    // Translates React to js
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env','@babel/preset-react', '@babel/preset-typescript']
                    }
                }
            },
            {
                test: /\.s[ac]ss$/,
                exclude: /node_modules/,
                use: [
                  'style-loader',
                  'css-loader',
                  'sass-loader'
                ]
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