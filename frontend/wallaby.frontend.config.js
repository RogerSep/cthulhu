var babel = require('babel-core');
var wallabyWebpack = require('wallaby-webpack');

var webpackPostprocessor = wallabyWebpack({
  module: {
    loaders: [
      {
        test: /sinon.*\.js$/,
        loader: 'imports?define=>false'
      }
    ]
  }
});

module.exports = function (wallaby) {
  var babelCompiler = wallaby.compilers.babel({
    babel: babel,
    presets: ['es2015', 'react', 'stage-0']
  });

  return {
    files: [
      { pattern: 'node_modules/phantomjs-polyfill/bind-polyfill.js', instrument: false },
      { pattern: 'node_modules/babel-polyfill/dist/polyfill.min.js', instrument: false },
      { pattern: 'app/**/*.js', load: false }
    ],

    tests: [
      { pattern: 'tests/**/*.spec.js', load: false }
    ],

    compilers: {
      'app/**/*.js': babelCompiler,
      'tests/**/*.js': babelCompiler
    },

    postprocessor: webpackPostprocessor,

    bootstrap: function () {
      window.__moduleBundler.loadTests();
    }
  };
};

