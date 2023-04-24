const path = require('path')
const webpack = require('webpack')
const ESLintPlugin = require('eslint-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const APP_DIR = path.join(__dirname, 'src', 'app')
const BUILD_DIR = path.join(__dirname, 'dist')

module.exports = {
  devServer: {
    hot: true,
    port: 9002,
    static: path.join(__dirname, 'dist'),
  },
  devtool: 'inline-source-map',
  entry: {
    app: {
      dependOn: "vendor",
      import: APP_DIR + '/index.tsx'
    },
    vendor: [
      '@reduxjs/toolkit',
      '@redux-saga/core',
      'react',
      'react-dom',
      'react-redux',
      'redux',
    ],
  },
  mode: process.env.NODE_ENV || 'development',
  module: {
    rules: [
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        use: [{ loader: 'url-loader' }],
      },
      {
        exclude: /node_modules/,
        include: APP_DIR,
        test: /\.(js|jsx|ts|tsx)$/,
        use: [{ loader: 'babel-loader' }],
      },
    ],
  },
  output: {
    filename: '[name].prod.js',
    path: BUILD_DIR,
  },
  plugins: [
    new ESLintPlugin(),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./src/app/index.html",
      title: "Web Assembly"
    })
  ],
  resolve: {
    alias: {
      components: path.resolve(__dirname, 'src', 'app', 'components'),
      sagas: path.resolve(__dirname, 'src', 'app', 'sagas'),
      selectors: path.resolve(__dirname, 'src', 'app',  'selectors'),
      store: path.resolve(__dirname, 'src', 'app',  'store'),
      theme: path.resolve(__dirname, 'src', 'app',  'theme'),
    },
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
    modules: ['node_modules'],
  },
}
