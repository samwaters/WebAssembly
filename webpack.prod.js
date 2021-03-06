const path = require('path')
const webpack = require('webpack')

const APP_DIR = path.join(__dirname, 'src', 'app')
const BUILD_DIR = path.join(__dirname, 'dist')

const config = {
  entry: [
    APP_DIR + '/index.tsx'
  ],
  mode: 'production',
  module: {
    rules: [
      {
        enforce: 'pre',
        exclude: /node_modules/,
        loader: 'tslint-loader',
        test: /\.(js|jsx|ts|tsx)$/
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        use: [
          {loader: "url-loader"}
        ]
      },
      {
        exclude: /node_modules/,
        include: APP_DIR,
        test: /\.(js|jsx|ts|tsx)$/,
        use: [
          {loader: "babel-loader"}
        ]
      }
    ]
  },
  output: {
    filename: '[name].prod.js',
    path: BUILD_DIR
  },
  plugins: [
    new webpack.DefinePlugin({"process.env": {NODE_ENV: JSON.stringify('production')}}),
  ],
  resolve: {
    alias: {
      actions: path.resolve(__dirname, 'src', 'app', 'actions'),
      components: path.resolve(__dirname, 'src', 'app', 'components'),
      reducers: path.resolve(__dirname, 'src', 'app', 'reducers'),
      selectors: path.resolve(__dirname, 'src', 'app', 'selectors'),
      theme: path.resolve(__dirname, 'src', 'app', 'theme')
    },
    extensions: ['.css', '.js', '.jsx', '.json', '.scss', '.ts', '.tsx'],
    modules: ['node_modules']
  }
}

module.exports = config
