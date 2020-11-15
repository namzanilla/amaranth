const redisHelper = require('./../helpers/redis');
const objectHelper = require('./../helpers/_Object');

module.exports = (app) => {
  const getCart = (token) => {
    const cartKey = getRedisCartKey(token);

    return getCartInfo(cartKey, app);
  };

  const addIntoCart = async (token, body = {}) => {
    const cartKey = getRedisCartKey(token);
    const products = validateCartRequestBody(body);
    const info = await getCartInfo(cartKey, app);

    Object.keys(products).forEach((productId) => {
      let {
        [productId]: count = 0,
      } = info;

      count += products[productId];

      info[productId] = count;
    });

    await setCartInfo(app, info, cartKey);

    return info;
  };

  const deleteFromCart = async (token) => {
    return {token};
  }

  return {
    getCart,
    addIntoCart,
    deleteFromCart,
  };
};

const getRedisCartKey = (cookieId) => {
  return `cart_${cookieId}`;
}

const getCartInfo = async (key, app) => {
  try {
    const getAsync = redisHelper.getAsync(app.redis.client);
    let info = await getAsync(key);
    info = info ? JSON.parse(info) : {};

    return info;
  } catch (e) {
    console.log(e);
    return {};
  }
};

const validateCartRequestBody = (requestBody) => {
  if (!objectHelper.isPlainObject(requestBody)) {
    return {};
  }

  const result = {};

  Object.keys(requestBody).forEach((productId) => {
    productId = parseInt(productId);
    if (isNaN(productId)) return false;

    let count = requestBody[productId];
    count = parseInt(count);
    if (isNaN(count) || count < 1) return false;

    result[productId] = count;
  });

  return result;
};

const setCartInfo = (app, info, key) => {
  try {
    const setAsync = redisHelper.setAsync(app.redis.client);

    setAsync(key, JSON.stringify(info), 'EX', 60 * 60 * 24 * 30);
  } catch (e) {
    console.log(e);
  }
};
