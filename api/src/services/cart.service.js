const redisHelper = require('./../helpers/redis');
const objectHelper = require('./../helpers/_Object');
const qsHelper = require('./../helpers/qs');

module.exports = (app) => {
  const imageService = require('./image')(app);
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
      await redisHelper.delCartInfo(app, cartKey);
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

    const [error, images] = await imageService.getImagesByProductIds(productIds)

    if (!error) {
      try {
        for (const el of list) {
          const {
            [el.id]: ar
          } = images;

          if (ar) el.images = ar;
        }
      } catch (e) {
        console.error(e);
      }
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
    try {
      const cartKey = redisHelper.getRedisCartKey(token);
      const info = await redisHelper.getCartInfo(cartKey, app);
      body = validateCartRequestBody(body);

      if (info === null) {
        return {};
      } else if (objectHelper.isEmptyObject(info)) {
        await redisHelper.delCartInfo(app, cartKey);
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

          if (count === -1) {
            delete info[productId];
            return false;
          }

          info[productId] -= count;

          if (info[productId] < 1) {
            delete info[productId];
          }
        }
      });

      if (isModified) {
        if (objectHelper.isEmptyObject(info)) {
          await redisHelper.delCartInfo(app, cartKey);
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
    } catch (e) {
      console.log(e);
    }
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
    if (isNaN(count) || count === 0) return false;

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
