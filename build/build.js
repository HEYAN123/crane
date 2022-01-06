const ora = require('ora');
const chalk = require('chalk');
const webpack = require('webpack');

const checkVersion = require('./check-version');
const webpackConfig = require('./webpack.prod.config');

// 检查版本
checkVersion();

const spinner = ora('building for production...');
spinner.start();

// 构建
webpack(webpackConfig, (err, stats) => {
  spinner.stop();
  if (err) {
    console.log(chalk.red(`Build error.\n${err}`));
    throw err;
  }
  process.stdout.write(`${stats.toString({
    colors: true,
    chunks: true,
    modules: false,
    children: false,
    chunkModules: true,
  })}\n`);
  console.log(chalk.cyan('Build complete.\n'));
});
