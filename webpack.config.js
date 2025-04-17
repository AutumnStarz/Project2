const path = require('path');

module.exports = {
  entry: './client/index.js', 

  output: {
    path: path.resolve(__dirname, 'hosted'), 
    filename: 'bundle.js', 
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },

  resolve: {
    extensions: ['.js', '.jsx'],
  },


  devtool: 'source-map',


  devServer: {
    contentBase: path.join(__dirname, 'hosted'),
    compress: true,
    port: 8080,
  },
};
