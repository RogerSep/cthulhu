const webpack = require('karma-webpack');

module.exports = function(config) {
  config.set({
    frameworks: ['mocha'],
    files: [
      './node_modules/phantomjs-polyfill/bind-polyfill.js',
      './node_modules/babel-polyfill/dist/polyfill.min.js',
      'tests/**/*.spec.js'
    ],
    plugins: [webpack, 'karma-mocha', 'karma-phantomjs-launcher', 'karma-coverage', 'karma-spec-reporter'],
    browsers: ['PhantomJS'],
    preprocessors: {
      'tests/**/*.spec.js': ['webpack'],
      'app/**/*.js': ['webpack']
    },
    reporters: ['spec', 'coverage'],
    coverageReporter: {
      dir: 'build/reports/coverage',
      reporters: [
        { type: 'html', subdir: 'report-html' },
        { type: 'lcov', subdir: 'report-lcov' },
        { type: 'cobertura', subdir: '.', file: 'cobertura.txt' }
      ]
    },
    webpack: {
      module: {
        loaders: [
          {
            test: /\.js$/, exclude: /(bower_components|node_modules)/,
            loader: 'babel'
          }
        ],
        postLoaders: [{
          test: /\.js$/, exclude: /(node_modules|bower_components|tests)/,
          loader: 'istanbul-instrumenter'
        }]
      }
    },
    webpackMiddleware: { noInfo: true }
  });
};
