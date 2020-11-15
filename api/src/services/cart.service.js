const redisHelper = require('./../helpers/redis');
const objectHelper = require('./../helpers/_Object');
const qsHelper = require('./../helpers/qs');

module.exports = (app) => {
  const getCart = (token) => {
    const cartKey = getRedisCartKey(token);

    return getCartInfo(cartKey, app);
  };

  const getCartDetails = async (token, query) => {
    const cartKey = getRedisCartKey(token);

    const info = await getCartInfo(cartKey, app);

    const productIds = Object.keys(info).map((productId) => +productId);

    if (!productIds.length) {
      // @TODO remove redis cart key?
      return {};
    }

    let {language_id: languageId = 1} = query;
    languageId = qsHelper.prepareLanguageId(languageId);

    let qs = `
      SELECT p.*
      FROM product p
      WHERE p.id IN (${productIds.join(',')})
    `;

    const list = await new Promise((resolve, reject) => {
      app.mysql.connection.query(qs, (error, results) => {
        if (error) {
          reject(error);
        }

        resolve(results);
      });
    });

    let total = 0;

    for (const listEl of list) {
      const {
        id,
        name,
        price,
        [`name_trans_${languageId}`]: nameTrans,
      } = listEl;
      const {
        [id]: count,
      } = info;

      listEl.count = count;
      listEl.name = nameTrans ? nameTrans : name;

      delete listEl.name_trans_1;
      delete listEl.name_trans_2;

      total += count * price;
    }
    
    return {
      total,
      list,
    };
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
    getCartDetails,
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
