const {promisify} = require('util');

module.exports = {
  getAsync,
  setAsync,
  delAsync,
  getRedisCartKey,
  getCartInfo,
  delCartInfo,
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

function getRedisCartKey(token) {
  return `cart_${token}`;
}

async function getCartInfo(key, app) {
  try {
    let info = await getAsync(app.redis.client)(key);
    info = info === null ? info : JSON.parse(info);

    return info;
  } catch (e) {
    console.log(e);
    return {};
  }
}

async function delCartInfo(app, key) {
  try {
    await delAsync(app.redis.client)(key);
  } catch (e) {
    console.log(e);
  }
}
