const router = require('koa-router')();
const baseController = require('./base.controller');
router.prefix('/api/v1');
const modelHelper = require('../helpers/model');

const SEARCH_TYPE_MODEL = 0;
const SEARCH_TYPE_PRODUCT = 1;
const DEFAULT_SEARCH_LIMIT = 12;

module.exports = (app) => {
  const productService = require('./../services/product.service')(app);

  router.get('/product/:productId(\\d+)/brand', baseController(getBrandByProductId));
  router.get('/product/:productId(\\d+)/meta', baseController(getMetaByProductId));
  router.get('/product/:productId', baseController(getProductId));
  router.get('/product-list', baseController(getProductList(app)));
  router.get('/model/:modelId(\\d+)', baseController(getProductModelById(app)));

  function getBrandByProductId(ctx) {
    const {
      params: {
        productId,
      } = {},
    } = ctx;

    return productService.getBrandByProductId(productId)
      .then(h(app).onFulfilled(ctx), h(app).onRejected(ctx));
  }

  function getProductId(ctx) {
    let {
      request: {
        query: {
          lid: languageId = 1,
        } = {},
      } = {},
      params: {
        productId,
      } = {},
    } = ctx;

    languageId = parseInt(languageId);
    productId = parseInt(productId);

    return productService.getProductId(productId, languageId)
      .then(h(app).onFulfilled(ctx), h(app).onRejected(ctx));
  }

  function getMetaByProductId(ctx) {
    const {
      params: {
        productId,
      } = {},
    } = ctx;

    return productService.getMetaByProductId(productId)
      .then(h(app).onFulfilled(ctx), h(app).onRejected(ctx));
  }

  return router;
};

async function getBrandModelAggsConf(app, modelId) {
  try {
    const qs = `
    SELECT
      bmac.meta_key_id as typeId
    FROM brand_model_aggs_conf bmac
    WHERE bmac.brand_model_id=?
    ORDER BY \`order\`;
    `;

    return new Promise((resolve, reject) => {
      const cb = (resolve, reject) => (error, results) => {
        if (error) {
          reject(error);
        }

        resolve(results);
      }

      app.mysql.connection.query(qs, modelId, cb(resolve, reject));
    });
  } catch (e) {
    console.error(e);
  }
}

/*async function getModelConfPayload(modelId, metaKeyId) {
  try {
    const qs = `
    SELECT
        mv.id,
        mv.name AS mv_name
    FROM product p
    
    INNER JOIN product2brand_model p2bm
    ON p2bm.product_id=p.id
    
    INNER JOIN product2meta_value p2mv
    ON p2mv.product_id=p.id
    
    INNER JOIN meta_value mv
    ON mv.id=p2mv.meta_value_id
    
    WHERE p2bm.brand_model_id=1
    AND mv.meta_key_id=3
    
    GROUP BY mv.id
    ORDER BY mv_name
    `;
  } catch (e) {
    console.error(e);
  }
}*/

function getProductModelById(app) {
  return async function (ctx) {
    try {
      const response = {};
      let {
        params: {
          modelId,
        } = {},
        request: {
          query: {
            lid: languageId = 1,
          } = {},
        } = {},
      } = ctx;

      modelId = parseInt(modelId);
      languageId = parseInt(languageId);

      const aggs = await getBrandModelAggsConf(app, modelId);

      if (aggs.length) {
        response.aggs = aggs;
      }

      response.info = await getModelInfo(modelId, languageId, app);
      response.images = await getModelImages([modelId], app);

      response.images = response.images[modelId] ? response.images[modelId] : response.images;

      // @todo nginx cache
      ctx.body = response;
    } catch (e) {
      console.error(e);

      ctx.status = 400;
    }
  }
}

async function getModelImages(modelIds, app) {
  const qs = `
  SELECT
    i.path,
    i.name,
    fe.name AS ext,
    mb2i.is_main as isMain,
    mb2i.brand_model_id AS modelId
  FROM image i
  INNER JOIN brand_model2image mb2i
  ON mb2i.image_id=i.id
  INNER JOIN filename_extension fe
  ON fe.id=i.filename_extension_id
  WHERE mb2i.brand_model_id IN (${modelIds.join(',')})
  ORDER BY mb2i.is_main DESC;
  `;

  try {
    const images = await new Promise((resolve, reject) => {
      const cb = (resolve, reject) => (error, results) => {
        if (error) {
          reject(error);
        }

        resolve(results);
      }

      app.mysql.connection.query(qs, cb(resolve, reject));
    });

    const result = {};

    for (const image of images) {
      const {modelId} = image;
      result[modelId] = result[modelId] ? result[modelId] : [];
      delete image.modelId;

      if (0 === image.isMain) {
        delete image.isMain;
      }

      result[modelId].push(image);
    }

    return result;
  } catch (e) {
    console.error(e);
  }
}

async function getModelInfo(modelId, languageId, app) {
  try {
    const qs = `
    SELECT
      b.name AS brandMame,
      bm.name AS modelName,
      MIN(p.price) AS priceMin,
      MAX(p.price) AS priceMax
    FROM product p
    
    INNER JOIN product2brand p2b
    ON p2b.product_id=p.id
    
    INNER JOIN product2brand_model p2bm
    ON p2bm.product_id=p.id
    
    INNER JOIN brand b
    ON b.id=p2b.brand_id
    
    INNER JOIN brand_model bm
    ON bm.id=p2bm.brand_model_id
    
    WHERE bm.id=?
    
    GROUP BY b.id
    `;

    const info = await new Promise((resolve, reject) => {
      const cb = (resolve, reject) => (error, results) => {
        if (error) {
          reject(error);
        }

        const {0: result} = results;

        resolve(result);
      }

      app.mysql.connection.query(qs, modelId, cb(resolve, reject));
    });

    if (undefined === info) return {};

    return {
      title: modelHelper.getTitle(modelId, languageId, info),
      h1: modelHelper.getH1(modelId, languageId, info)
    };
  } catch (e) {
    console.error(e);
  }
}

function getProductList(app) {
  return async function (ctx) {
    try {
      let {
        request: {
          query: {
            st: searchType = SEARCH_TYPE_MODEL,
            cid: categoryId,
            p: page = 1,
          } = {},
        } = {},
      } = ctx;

      if (undefined === categoryId) {
        throw 'cid param is required';
      }

      page = parseInt(page);
      categoryId = parseInt(categoryId);
      searchType = parseInt(searchType);

      if (isNaN(categoryId) || categoryId < 0) {
        throw 'Invalid cid param';
      }

      if (isNaN(page) || page < 1) {
        throw 'Invalid page param';
      }

      if (!isValidSearchType(searchType)) {
        throw 'Invalid st param';
      }

      const offset = (page - 1) * DEFAULT_SEARCH_LIMIT;

      const total = await new Promise((resolve, reject) => {
        const qs = `
          SELECT count(*) as total FROM(  
            SELECT
              count(bm.id)
            FROM product p
            
            INNER JOIN product2brand p2b
            ON p2b.product_id=p.id
            INNER JOIN brand b
            ON b.id=p2b.brand_id
            
            INNER JOIN product2brand_model p2bm
            ON p2bm.product_id=p.id
            INNER JOIN brand_model bm
            ON bm.id=p2bm.brand_model_id
            
            INNER JOIN product2category p2c
            ON p2c.product_id=p.id
            
            WHERE p2c.category_id=?
            
            GROUP BY bm.id
          ) t
          ;`

        const cb = (resolve, reject) => (error, results) => {
          if (error) {
            reject(error);
          }

          const {
            0: {
              total = 0,
            } = {}
          } = results;

          resolve(total);
        }

        app.mysql.connection.query(qs, categoryId, cb(resolve, reject));
      });

      const list = await new Promise((resolve, reject) => {
        const qs = `
          SELECT
            b.id AS brandId,
            bm.id AS modelId,
            concat(b.name, ', ', bm.name) as name,
            MIN(p.price) AS priceMin,
            MAX(p.price) AS priceMax
          FROM product p
          
          INNER JOIN product2brand p2b
          ON p2b.product_id=p.id
          INNER JOIN brand b
          ON b.id=p2b.brand_id
          
          INNER JOIN product2brand_model p2bm
          ON p2bm.product_id=p.id
          INNER JOIN brand_model bm
          ON bm.id=p2bm.brand_model_id
          
          INNER JOIN product2category p2c
          ON p2c.product_id=p.id
          
          WHERE p2c.category_id=?
          
          GROUP BY brandId, modelId
  
          LIMIT ${offset}, ${DEFAULT_SEARCH_LIMIT}
          ;`

        const cb = (resolve, reject) => (error, results) => {
          if (error) {
            reject(error);
          }

          resolve(results);
        }

        app.mysql.connection.query(qs, categoryId, cb(resolve, reject));
      });

      const ids = list.map(({modelId}) => modelId)

      if (ids.length > 0) {
        const images = await getModelImages(ids, app);

        if (Object.keys(images).length > 0) {
          list.forEach((el) => {
            const {modelId} = el;

            const {
              [modelId]: result
            } = images;

            if (result) {
              el.images = result;
            }
          })
        }
      }

      // @todo nginx cache
      ctx.body = {total, list};
    } catch (e) {
      console.error(e);

      ctx.status = 400;
    }
  }
}

function isValidSearchType(searchType) {
  return searchType === SEARCH_TYPE_MODEL
  || searchType === SEARCH_TYPE_PRODUCT;
}

// default controller helper
function h(app) {
  return {
    onFulfilled: (ctx) => (res) => {
      ctx.body = res;
    },
    onRejected: (ctx) => (message) => {
      ctx.status = 500;

      if (app.isDevelopment === true) {
        ctx.body = message;
      }
    },
  };
}
