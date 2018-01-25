'use strict';
process.env.NODE_ENV = 'production';
const path = require('path');
const ora = require('ora');
const rm = require('rimraf');
const chalk = require('chalk');
const webpack = require('webpack');
const setupEnvOptions = require('./helpers/setupEnvOptions');

const getCommandLineOptions  = require('./helpers/getCommandLineOptions');
const options = getCommandLineOptions();
setupEnvOptions(options);

const config = require('./config');

const webpackConfig = require('./webpack_config/webpack.watch.conf');



const spinner = ora(`Start watcher, minigame ${options.minigame}, project ${options.project}`);
spinner.start();

// add watch options
webpackConfig.watch = true;
webpackConfig.watchOptions = {
  aggregateTimeout : 150
};
webpack(webpackConfig, (err, stats) => {
  spinner.stop();
  if (err) throw err;
  process.stdout.write(stats.toString({
    colors: true,
    modules: false,
    children: false, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
    chunks: false,
    chunkModules: false
  }) + '\n\n');

  if (stats.hasErrors()) {
    console.log(chalk.red('  Build failed with errors.\n'));
    process.exit(1);
  }

  console.log(chalk.cyan('  Build complete.\n'));
  console.log(chalk.cyan('  Watch files...\n'));

});

