const {promisify} = require('util');

module.exports = {
  getAsync,
  setAsync,
};

function getAsync(client) {
  return promisify(client.get).bind(client);
}

function setAsync(client) {
  return promisify(client.set).bind(client);
}
