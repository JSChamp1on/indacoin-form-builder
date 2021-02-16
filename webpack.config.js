/* eslint-disable */
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require("html-webpack-plugin");


const ENVIRONMENT = process.env.NODE_ENV;
const PRODUCTION = ENVIRONMENT === 'production';

const library = 'indacoin-form-builder';
const filename = PRODUCTION ? `${library}.min.js` : `${library}.js`;
const entry = PRODUCTION ? `${__dirname}/src/production/index.js` : `${__dirname}/src/development/index.js`;

let plugins = [];
let devServer = undefined;
let externals = undefined;

if (PRODUCTION) {
  externals = {
    'react': 'react',
    'react-dom': 'react-dom',
  };
} else {
  plugins.push(
    new HtmlWebpackPlugin({
      template: "./src/development/index.html",
    })
  );

  devServer = {
      contentBase: path.join(__dirname, "dist"),
      compress: true,
      port: 3000,
      historyApiFallback: true,
  };
}

module.exports = {
  entry,
  externals,
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
    filename,
    library,
    path: `${__dirname}/lib`,
    libraryTarget: 'umd',
    umdNamedDefine: true,
  },
  plugins,
  devServer,
};