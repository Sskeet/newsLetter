const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  mode: 'development',
  watch: true,
  entry: {
    main: './client/src/index.js'
  },
 // this is for output where you want to put your file after complete build process
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.bundle.js',
  },

  // here we will load some external resource. which we are using to build our project
  module: {
    rules: [
      {
        test: /\.js$/,                     // it will find all js
        use: 'babel-loader',               // which will perform some functioanlity during build process.
        exclude: [/node_modules/, /dist/], // expect this
      },
      {
        test: /\.js$/,
        include: [/src/, /tests/],
        loader: 'eslint-loader',
        options: {
          // fix: true
        }
      },
      {
        test: /\.scss$/,
        use: [{
          loader: 'style-loader'
        }, {
          loader: 'css-loader'
        }, {
          loader: 'sass-loader'
        }]
      },
      // Font-awesome 4.7.X
      {
        test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        loader: 'file-loader?name=fonts/[name].[ext]',
        include: [/font-awesome/],
      },
      // Font-awesome 5.X
      {
        test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        loader: 'file-loader?name=fonts/[name].[ext]',
        exclude: [/font-awesome/],
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'assets/',
        },
      },
    ],
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.$': 'jquery',
      'window.jQuery': 'jquery',
    }),
    // new CopyWebpackPlugin([{
    //   from: './src/assets',
    //   to: 'assets',
    // }]),
    new HtmlWebpackPlugin({
      template: './client/src/index.html',
      minify:{
        collapseWhitespace: true
      },
      chunksSortMode: 'dependency',
    }),
    new CleanWebpackPlugin(['dist']),
  ]
};