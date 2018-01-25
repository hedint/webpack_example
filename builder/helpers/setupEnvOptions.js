module.exports = function (params) {
  for ( let param_name in params) {
    if (params.hasOwnProperty(param_name)) {
      process.env[param_name] = params[param_name];
    }
  }
};