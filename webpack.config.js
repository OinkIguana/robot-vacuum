'use strict';

module.exports = {
  entry: './src/index.js',
  output: {
    path: 'public_html',
    filename: 'index.min.js'
  },
  module: {
    loaders: [
      { test: /.*\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
      { test: /.*\.json$/, exclude: /node_modules/, loader: 'json-loader' },
    ]
  }
}
