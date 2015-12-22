const WebpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');
const config = require('./webpack.config.js');

const server = new WebpackDevServer(webpack(config), {
  proxy: {
    '*': 'http://localhost:9000'
  }
});
