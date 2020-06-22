const path = require('path');

module.exports = {
  devtool: 'source-map',
  entry: './src/index',
  output: {
    path: path.resolve(__dirname, 'lib'),
    filename: 'index.js'
  },
  resolve: {
    extensions: ['.ts', '.tsx'],
    alias: {
      react: 'preact/compat'
    }
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loaders: ['ts-loader']
      }
    ]
  }
};
