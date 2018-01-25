'use strict';
process.env.NODE_ENV = 'production';

const path = require('path');
const ora = require('ora');
const rm = require('rimraf');
const chalk = require('chalk');
const config = require('./config');
const webpack = require('webpack');
const setupEnvOptions = require('./helpers/setupEnvOptions');

const getCommandLineOptions  = require('./helpers/getCommandLineOptions');
const options = getCommandLineOptions();
setupEnvOptions(options);

const webpack_config = require('./webpack_config/webpack.prod.conf');


const spinner = ora(`Собираю production билд, миниигра ${options.minigame}, проект ${options.project}`);
spinner.start();

webpack(webpack_config, (err, stats) => {
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
  console.log(chalk.yellow(
    '  Tip: built files are meant to be served over an HTTP server.\n' +
    '  Opening index.html over file:// won\'t work.\n'
  ));
});

