const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, 'examples/index.jsx'),
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'examples/dist'),
  },
  module: {
    rules: [{
      test: [/\.jsx$/],
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        plugins: ['transform-decorators-legacy'],
        presets: ['react', 'es2015', 'stage-1'],
      },
    }],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};
