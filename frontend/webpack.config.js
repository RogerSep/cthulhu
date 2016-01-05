const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const pkg = require('./package.json');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const Clean = require('clean-webpack-plugin');

const PATHS = {
  app: path.resolve(__dirname, 'app'),
  build: path.resolve(__dirname, '../webapp/public')
};

const common = {
  entry: PATHS.app,
  output: {
    path : PATHS.build,
    filename: 'bundle.js',
    contentBase: 'http://localhost:9000',
    publicPath: 'http://localhost:8080/assets/'
  },
  resolve: {
    extensions: ['', '.js']
  },
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        loaders: ['eslint'],
        include: PATHS.app,
        exclude: [PATHS.build, './node_modules']
      }
    ],
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel'],
        include: PATHS.app
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style', 'css-loader?sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!sass-loader?sourceMap'),
        include: PATHS.app
      }
    ]
  }
};

module.exports = merge(common, {
  devtool: 'eval-source-map',
  devServer: {
    historyApiFallback: true,
    hot: true,
    inline: true,
    progress: true,
    stats: 'errors-only',
    host: process.env.HOST,
    port: process.env.PORT
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin('bundle.css')
  ]
});
