const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require("html-webpack-plugin");


const library = process.env.LIBRARYNAME;
const dirname = `${__dirname}/../`;

module.exports = {
  entry: `${dirname}/src/development/index.js`,
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { targets: "defaults" }]
            ]
          }
        }
      }
    ]
  },
  output: {
    library,
    filename: `${library}.js`,
    path: `${dirname}/lib`,
    libraryTarget: 'umd',
    umdNamedDefine: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: `${dirname}/src/development/index.html`,
    }),
  ],
  devServer: {
    contentBase: `${dirname}/dist`,
    compress: true,
    port: 3000,
    historyApiFallback: true,
  },
};