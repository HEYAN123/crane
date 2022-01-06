const path = require('path');
// const webpack = require('webpack');
const { merge } = require('webpack-merge');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const WebpackBuildNotifierPlugin = require('webpack-build-notifier');
// const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');



// const { dev: devConfig, APP_NAME, SINGLE } = require('../config');
// const utils = require('./utils');

// 基础配置
const webpackBaseConfig = require('./webpack.base.config.js');

// 合并base配置和当前定义的dev配置
module.exports = merge(webpackBaseConfig, {
  // 打包输出位置
  output: {
    path: path.resolve(__dirname, './dist'), // 输出文件都放到dist目录下
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
    crossOriginLoading: 'anonymous',
  },
  // module: {
  //   rules: [],
  // },
  plugins: [
    // 构建通知
    // new WebpackBuildNotifierPlugin({
    //   logo: path.resolve('./config/logo.png'),
    //   suppressSuccess: true,
    // }),
    // // 错误提示
    // new FriendlyErrorsPlugin(),
    // // HMR
    // new webpack.HotModuleReplacementPlugin(),
    // new HtmlWebpackPlugin({
    //   filename: devConfig.index,
    //   template: devConfig.template,
    //   favicon: 'src/assets/images/favicon.ico',
    //   inject: true,
    //   templateParameters: {
    //     SINGLE,
    //     APP_NAME,
    //   },
    // }),
  ],
  devServer: { // 开发服务
    // clientLogLevel: 'warning',
    hot: true,
    historyApiFallback: {
      historyApiFallback: true,
    },
    // contentBase: false,
    compress: true,
    // host: devConfig.host,
    port: 8888,
    // open: devConfig.autoOpenBrowser,
    // overlay: devConfig.errorOverlay ? { warnings: false, errors: true } : false,
    // publicPath: devConfig.assetsPublicPath,
    // proxy: devConfig.proxyTable,
    // watchOptions: {
    //   poll: false,
    // },
    // headers: devConfig.headers,
  },
});
