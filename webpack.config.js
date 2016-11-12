var path = require('path');
// var webpack = require('webpack');

module.exports = {
  entry: [
    './client/components/file.jsx'
  ],
  output: {
    path: path.join(__dirname, '/client'),
 	  filename: 'build.js',
  },
	resolve: {
		extensions: [
      '', '.js', '.jsx'
    ],
	},
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        // To circumvent error: '$export is not a function'
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
}
