const redisHelper = require('./../helpers/redis');
const objectHelper = require('./../helpers/_Object');
const qsHelper = require('./../helpers/qs');

module.exports = (app) => {
  const getCart = async (token) => {
    const cartKey = redisHelper.getRedisCartKey(token);
    const info = await redisHelper.getCartInfo(cartKey, app);

    return info === null ? {} : info;
  };

  const getCartDetails = async (token, query) => {
    const cartKey = redisHelper.getRedisCartKey(token);

    const info = await redisHelper.getCartInfo(cartKey, app);

    if (info === null) return {};

    const productIds = Object.keys(info).map((productId) => +productId);

    if (!productIds.length) {
      await delCartInfo(app, cartKey);
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

  const getAmountByInfo = async (info) => {
    const productIds = Object.keys(info);

    return new Promise((resolve, reject) => {
      const qs = `
        SELECT p.id, p.price
        FROM amaranth.product p
        WHERE p.id IN (${productIds.join(',')});     
      `;

      app.mysql.connection.query(qs, (error, results) => {
        if (error) {
          reject(error);
        }
        
        let amount = 0;
        
        for (result of results) {
          const {id, price} = result;
          const count = info[id];

          amount += count * price;
        }
        
        resolve(amount);
      });
    });
  }

  const addIntoCart = async (token, body = {}) => {
    const cartKey = redisHelper.getRedisCartKey(token);
    const products = validateCartRequestBody(body);
    let info = await redisHelper.getCartInfo(cartKey, app);

    info = info === null ? {} : info;

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

  const removeFromCart = async (token, body) => {
    const cartKey = redisHelper.getRedisCartKey(token);
    const info = await redisHelper.getCartInfo(cartKey, app);
    body = validateCartRequestBody(body);

    if (info === null) {
      return {};
    } else if (objectHelper.isEmptyObject(info)) {
      await delCartInfo(app, cartKey);
      return {};
    } else if (objectHelper.isEmptyObject(body)) {
      // @TODO bad request 400
      return {};
    }

    let isModified = false;
    Object.keys(body).forEach((productId) => {
      let count = body[productId];
      count = parseInt(count);
      if (isNaN(count)) return false;
      if (info[productId] !== undefined) {
        isModified = true;
        info[productId] -= count;

        if (info[productId] < 1) {
          delete info[productId];
        }
      }
    });

    if (isModified) {
      if (objectHelper.isEmptyObject(info)) {
        await delCartInfo(app, cartKey);
        return {};
      } else {
        try {
          await setCartInfo(app, info, cartKey);
        } catch (e) {
          console.log(e);
        }
      }
    }

    return info;
  }

  return {
    getCart,
    getCartDetails,
    addIntoCart,
    removeFromCart,
    getAmountByInfo,
  };
};

function validateCartRequestBody (requestBody) {
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

  /*
  Object.keys(requestBody)
    .filter((productId) => {
      if (isNaN(parseInt(productId))) return false;
      let count = requestBody[productId];
      count = parseInt(count);
      if (isNaN(count) || count < 1) return false;

      return true;
    })
    .forEach((productId) => {
      result[productId] = count;
    });
  * */

  return result;
}

async function setCartInfo (app, info, key) {
  try {
    const setAsync = redisHelper.setAsync(app.redis.client);

    await setAsync(key, JSON.stringify(info), 'EX', 60 * 60 * 24 * 30);
  } catch (e) {
    console.log(e);
  }
}
