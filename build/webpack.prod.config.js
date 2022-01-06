// const path = require('path');
const webpackMerge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
// const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpackBaseConfig = require('./webpack.base.config.js');

const { build: buildConfig, APP_NAME, SINGLE } = require('../config');


// 打包生产配置
const webpackConfig = webpackMerge(webpackBaseConfig, {
  // 出口
  output: {
    path: buildConfig.assetsRoot,
    publicPath: buildConfig.assetsPublicPath,
    filename: 'index.[chunkhash].js',
    chunkFilename: '[name].[chunkhash].chunk.js',
    crossOriginLoading: 'anonymous',
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      name: true,
      cacheGroups: {
        commons: {
          name: 'commons',
          test: /[\\/]node_modules[\\/]/,
          chunks: 'all',
          priority: 90,
          enforce: true,
        },
        'async-commons': {
          name: 'async-commons',
          test: /\.js$/,
          chunks: 'async',
          priority: 100,
          enforce: true,
        },
      },
    },
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        uglifyOptions: {
          compress: {
            drop_console: true,
          },
          mangle: {
            reserved: [''],
          },
        },
        sourceMap: true,
      }),
      new OptimizeCSSAssetsPlugin({
        assetNameRegExp: /\.css$/g,
        cssProcessor: require('cssnano'),
        cssProcessorPluginOptions: {
          preset: ['default', { discardComments: { removeAll: true } }],
        },
        canPrint: true,
      }),
    ],
  },
  plugins: [
    // CSS提取为独立文件
    new MiniCssExtractPlugin({
      filename: 'index.[contenthash:8].css',
      chunkFilename: '[name].[contenthash:8].chunk.css',
      ignoreOrder: false,
    }),
    // html模板
    new HtmlWebpackPlugin({
      filename: buildConfig.index,
      template: buildConfig.template,
      favicon: 'src/assets/images/favicon.ico',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
      },
      templateParameters: {
        SINGLE,
        APP_NAME,
      },
    }),
    // Manifest
    new ManifestPlugin({
      fileName: 'mapping.json',
      basePath: '',
    }),
  ],
});

if (buildConfig.bundleAnalyzerReport) {
  const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
  webpackConfig.plugins.push(new BundleAnalyzerPlugin());
}

module.exports = webpackConfig;
