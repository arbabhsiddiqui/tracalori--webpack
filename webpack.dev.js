const path = require('path');
const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common.js');
const { EnvironmentPlugin } = require('webpack');
const devConfig = {
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'dist'),
    },
    port: 3000,
    open: true,
    hot: true,
    compress: true,
    historyApiFallback: true,
  },
  plugins: [
    new EnvironmentPlugin({
      API: 'development URL',
    }),
  ],
};

module.exports = merge(commonConfig, devConfig);
