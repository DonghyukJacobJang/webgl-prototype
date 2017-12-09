const path = require('path');
const webpack = require('webpack');
const BabiliPlugin = require('babili-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const production = process.env.NODE_ENV === 'production';

const plugins = [
  new HtmlWebpackPlugin({
    title: 'WebGL Prototype',
    template: './src/html/index.ejs',
    filename: '../index.html',
    showErrors: true
  })
];
if (production) {
  plugins.push(new BabiliPlugin());
}

module.exports = {
  entry: path.join(__dirname, 'src/js/index.ts'),
  devtool: production ? '' : 'source-map',
  output: {
    path: path.join(__dirname, './public/js'),
    filename: production ? 'bundle.min.js' : 'bundle.js'
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  module: {
    loaders: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: 'babel-loader!ts-loader'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: [
            [
              '@babel/preset-env',
              {
                targets: {
                  browsers: ['last 2 versions', 'safari >= 7']
                }
              }
            ]
          ]
        }
      }
    ]
  },
  stats: 'minimal',
  plugins
};
