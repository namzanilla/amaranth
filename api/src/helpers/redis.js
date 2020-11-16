const {promisify} = require('util');

module.exports = {
  getAsync,
  setAsync,
  delAsync,
};

function getAsync(client) {
  return promisify(client.get).bind(client);
}

function setAsync(client) {
  return promisify(client.set).bind(client);
}

function delAsync(client) {
  return promisify(client.del).bind(client);
}
