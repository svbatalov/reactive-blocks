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
    }, {
        test: /\.scss$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[path][name]__[local]--[hash:base64:5]'
            }
          },
          {
            loader: 'sass-loader',
            options: {
              includePaths: []
            }
          }
        ]
      },
    ]
  },
  resolve: {
    extensions: [ '.js', '.jsx' ]
  }
}
