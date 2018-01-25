const commandLineArgs = require('command-line-args');

/**
 * возвращает заданные параметры командной строки
 * @return {Object}
 */
function getCommandLineOptions () {
  const optionDefinitions = [
    { name: 'project', alias: 'p', type: String },
    { name: 'minigame', alias: 'm', type: String }
  ];
  let options =  commandLineArgs(optionDefinitions);
  return options;
}
module.exports = getCommandLineOptions;