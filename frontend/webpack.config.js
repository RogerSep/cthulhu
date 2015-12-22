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
    publicPath: '/assets/',
    contentBase: 'http://localhost:9000'
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    preLoaders: [
      {
        test: /\.jsx?/,
        loaders: ['eslint'],
        include: PATHS.app,
        exclude: [PATHS.build, './node_modules']
      }
    ],
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['babel'],
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
    port: process.env.PORT,
    proxy: {
      '*': {
        target: 'http://localhost:9000',
        secure: false
      }
    }
  },
  module: {
    loaders: [{
      test: /\.css$/,
      loaders: ["style", "css"],
      include: PATHS.app
    }]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
});