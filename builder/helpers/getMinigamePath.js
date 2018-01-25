const path = require('path');

/**
 * Возвращает базовый путь до проекта
 * @return {string}
 */
function getMinigamePath () {
  return path.resolve(path.join('minigames', process.env.minigame, process.env.project));
}
module.exports = getMinigamePath();