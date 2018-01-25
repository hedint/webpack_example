const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const setupEnvOptions = require('../helpers/setupEnvOptions');
const portfinder = require('portfinder');

module.exports = function (env) {
  setupEnvOptions(env);
  let webpack_dev_config = require('./webpack.dev.conf');
  const config = require('../config');
  const utils = require('../helpers/utils');

  return new Promise((resolve, reject) => {
    portfinder.basePort = process.env.PORT || config.dev.port;
    portfinder.getPort((err, port) => {
      if (err) {
        reject(err)
      } else {
        // publish the new Port, necessary for e2e tests
        process.env.PORT = port;
        // add port to devServer config
        webpack_dev_config.devServer.port = port;

        // Add FriendlyErrorsPlugin
        webpack_dev_config.plugins.push(new FriendlyErrorsPlugin({
          compilationSuccessInfo: {
            messages: [`Your application is running here: http://${webpack_dev_config.devServer.host}:${port}`],
          },
          onErrors: config.dev.notifyOnErrors
            ? utils.createNotifierCallback()
            : undefined
        }));

        resolve(webpack_dev_config)
      }
    })
  });
};


