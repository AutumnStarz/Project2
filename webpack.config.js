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
      // CSS loader to handle CSS files
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },

  // Resolve extensions for JavaScript and JSX files
  resolve: {
    extensions: ['.js', '.jsx'],
  },

  // Webpack development tools (for debugging)
  devtool: 'source-map',

  // For serving static assets during development
  devServer: {
    contentBase: path.join(__dirname, 'hosted'), // Serve from 'hosted/' folder
    compress: true,
    port: 8080,
  },
};
