var path = require('path');
var HTMLWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    home: './src/js/app.js',
    ourStory: './src/js/ourStory.js',
    becomeAPartner: './src/js/becomeAPartner.js'
  },
  output : {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].app_bundle.js',
    publicPath: '/'
  },
  module: {
    rules: [

      // Converts ECMA2015 JS and SASS Syntax to ECMA2014 and CSS3
      { test: /\.(js)$/, use: 'babel-loader' },
      { test: /\.s?css$/, use: [ 'style-loader', 'css-loader', 'sass-loader' ]},

        // Load HTML files
      { test: /\.html$/, use: ['html-loader'] },

        // Load json files
      { test: /\.json$/, loader: 'json-loader' },
        // Copy images to dist folder
      {
        test: [/\.png$/, /\.jpg$/, /\.gif$/],
        loader: require.resolve('file-loader'),
        options: {
          name: '[name].[ext]',
          outputPath: 'assets/img/',
          publicPath: '/'
        }
      },

        // Copy fonts to dist folder
      {
        test: [/\.eot$/, /\.ttf$/, /\.woff$/, /\.svg$/],
        include: path.join(__dirname, './src/assets/fonts'),
        loader: require.resolve('file-loader'),
        options: {
          name: 'assets/fonts/[name].[ext]'
        }
      },

    ]
  },
  devServer: {
    historyApiFallback: true
  },
  plugins: [
    new HTMLWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.html',
      chunks: ['home']
    }),
    new HTMLWebpackPlugin({
      filename: 'ourStory.html',
      template: 'src/ourStory.html',
      chunks: ['ourStory']
    }),

    new HTMLWebpackPlugin({
      filename: 'becomeAPartner.html',
      template: 'src/becomeAPartner.html',
      chunks: ['becomeAPartner']
    }),

    new CopyWebpackPlugin([
      { from: 'src/data/data.json', to: 'data/data.json' },
    ])
  ],
}