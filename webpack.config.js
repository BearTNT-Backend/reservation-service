const path = require('path');
const webpack = require('webpack');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
var SRC_DIR = path.join(__dirname, '/client/src');
var DIST_DIR = path.join(__dirname, '/client/dist');
module.exports = {
  mode: 'production',
  plugins: [
    new CleanWebpackPlugin(),
    new UglifyJSPlugin(),
    new webpack.DefinePlugin({
      'process.env':{'NODE_ENV': JSON.stringify('production'),}
    }),
  ],
  entry: SRC_DIR +'/index.jsx',
  output: {
    filename: 'bundle.js',
    path: DIST_DIR
  },
  watch: true,
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  }
};