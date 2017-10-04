let path = require('path');

module.exports = {
  context: __dirname + '/src',
  entry: './index.jsx',

  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js',
    publicPath: '/dist',
  },

  devServer: {
    contentBase: path.resolve(__dirname, 'src'),
  },

  module: {
    loaders: [{
      test: /\.jsx?$/,
      include: [
        path.resolve(__dirname, 'src'),
      ],
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        presets: ["es2015", "stage-0", "react"],
      },
    }]
  },
  resolve: {
    extensions: [ '.js', '.jsx' ]
  }
}
