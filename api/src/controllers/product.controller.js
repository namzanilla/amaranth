const router = require('koa-router')();
const baseController = require('./base.controller');
router.prefix('/api/v1');
const modelHelper = require('../helpers/model');

const {isDevelopment} = require('../helpers/environment');

const SEARCH_TYPE_MODEL = 0;
const SEARCH_TYPE_PRODUCT = 1;
const DEFAULT_SEARCH_LIMIT = 12;

const MK_PRODUCT_FLAVOR_ID = 3;
const MK_PRODUCT_NET_WEIGHT_GRAMM_ID = 2;

const AGG_TYPE_7 = 1; // package_quantity_(pieces)
const AGG_TYPE_3_PIPE_7 = 2; // PRODUCT_FLAVOR > PRODUCT_NET_WEIGHT_GRAMM

module.exports = (app) => {
  const productService = require('./../services/product.service')(app);

  router.get('/product/:productId(\\d+)/brand', baseController(getBrandByProductId));
  router.get('/product/:productId(\\d+)/meta', baseController(getMetaByProductId));
  router.get('/product/:productId', baseController(getProductId));
  router.get('/product-list', baseController(getProductList(app)));
  router.get('/model/:modelId(\\d+)', baseController(getProductModelById(app)));
  router.get(`/model/:modelId(\\d+)/agg/${AGG_TYPE_3_PIPE_7}/:paramFirst(\\d+)`, baseController(get_AGG_TYPE_3_PIPE_7_SECOND(app)));

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

function get_AGG_TYPE_3_PIPE_7_SECOND(app) {
  return async function (ctx) {
    try {
      let {
        request: {
          query: {
            lid: languageId = 1,
          } = {},
        } = {},
        params: {
          modelId,
          paramFirst,
        } = {}
      } = ctx;

      const agg = await new Promise((resolve, reject) => {
        const qs = `
        SELECT
          mv.id,
          mv.name
        FROM product p
        
        INNER JOIN product2brand_model p2bm
        ON p2bm.product_id=p.id
        
        INNER JOIN product2meta_value p2mv
        ON p2mv.product_id=p.id
        
        INNER JOIN meta_value mv
        ON mv.id=p2mv.meta_value_id
        
        WHERE p2bm.brand_model_id=${modelId}
        AND mv.meta_key_id=${MK_PRODUCT_NET_WEIGHT_GRAMM_ID}
        
        GROUP BY mv.id
        ORDER BY CAST(mv.name AS UNSIGNED)
        `;
        const cb = (resolve, reject) => (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
        }

        app.mysql.connection.query(qs, modelId, cb(resolve, reject));
      });

      const metaValueIds = agg.map(({id}) => id);

      const metaValueId2productId = await new Promise((resolve, reject) => {
        const qs = `
        SELECT
          p2mv4.meta_value_id AS metaValueId,
          p4.id AS productId
        FROM product2meta_value p2mv4
        INNER JOIN product p4
        ON p4.id = p2mv4.product_id
        INNER JOIN meta_value mv4
        ON mv4.id = p2mv4.meta_value_id
        INNER JOIN meta_key mk4
        ON mk4.id = mv4.meta_key_id
        WHERE mk4.id=${MK_PRODUCT_NET_WEIGHT_GRAMM_ID}
        AND p4.id IN (
          SELECT p3.id
          FROM product p3
          INNER JOIN product2meta_value p2mv3
          ON p2mv3.product_id = p3.id
          WHERE p2mv3.meta_value_id=${paramFirst}
          AND p3.id IN (
            SELECT p2.id
            FROM product p2
            INNER JOIN product2meta_value p2mv2
            ON p2mv2.product_id = p2.id
            WHERE p2mv2.meta_value_id IN (${metaValueIds.join(',')})
            AND p2.id IN (
              SELECT p1.id
              FROM product p1
              INNER JOIN product2meta_value p2mv1
              ON p2mv1.product_id = p1.id
              INNER JOIN product2brand_model p2bm1
              ON p2bm1.product_id = p1.id
              WHERE p2bm1.brand_model_id=${modelId}
            )
          )
        )
        `;
        const cb = (resolve, reject) => (error, results) => {
          if (error) {
            reject(error);
          } else {
            const metaValueId2productId = {};

            for (const result of results) {
              metaValueId2productId[result.metaValueId] = result.productId;
            }

            resolve(metaValueId2productId);
          }
        }

        app.mysql.connection.query(qs, modelId, cb(resolve, reject));
      });


      const prepareResponse = (agg) => {
        agg.forEach((el) => {
          const {id} = el;
          const {
            [id]: productId,
          } = metaValueId2productId;

          el.id = productId;

          el.name = +el.name;
          const kg = el.name / 1000;

          if (kg > 1) {
            el.name = `${kg} кг`;
          } else {
            el.name = `${el.name} г`;
          }
        })

        return agg;
      }

      ctx.body = prepareResponse(agg);

    } catch (e) {
      console.error(e);
    }
  }
}

async function get_AGG_TYPE_3_PIPE_7_FIRST(app, modelId) {
  try {
    const qs = `
    SELECT
      mv.id,
      mv.name
    FROM product p
    
    INNER JOIN product2brand_model p2bm
    ON p2bm.product_id=p.id
    
    INNER JOIN product2meta_value p2mv
    ON p2mv.product_id=p.id
    
    INNER JOIN meta_value mv
    ON mv.id=p2mv.meta_value_id
    
    WHERE p2bm.brand_model_id=?
    AND mv.meta_key_id=${MK_PRODUCT_FLAVOR_ID}
    
    GROUP BY mv.id
    ORDER BY mv.name
    `;

    const agg = await new Promise((resolve, reject) => {
      const cb = (resolve, reject) => (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      }

      app.mysql.connection.query(qs, modelId, cb(resolve, reject));
    });

    return [null, agg];
  } catch (e) {
    console.error(e);

    return [e];
  }
}

async function getModelAggregations(app, aggType, modelId) {
  try {
    if (aggType === 2) {
      const [e, agg] = await get_AGG_TYPE_3_PIPE_7_FIRST(app, modelId);

      if (e) {
        return [e];
      }

      return [null, agg];
    }

  } catch (e) {
    console.log(e);

    return [e];
  }
}

async function getModelAggregationConf(app, modelId) {
  try {
    const qs = `
    SELECT
      bmac.meta_key_id as metaKeyId
    FROM brand_model_aggs_conf bmac
    WHERE bmac.brand_model_id=?
    ORDER BY \`order\`;
    `;

    const conf = await new Promise((resolve, reject) => {
      const cb = (resolve, reject) => (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      }

      app.mysql.connection.query(qs, modelId, cb(resolve, reject));
    });

    return [null, conf];
  } catch (e) {
    console.error(e);

    return [e];
  }
}

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
      languageId = parseInt(languageId); // @todo > language helper


      const [modelInfoError, modelInfo] = await getModelInfo(modelId, languageId, app);

      if (null === modelInfo) {
        ctx.status = 400;
        return;
      } else if (modelInfoError) {
        ctx.status = 500;

        if (isDevelopment()) {
          ctx.body = modelInfoError;
        }

        return;
      }


      response.info = {...modelInfo};

      if (modelInfo.aggType) {
        delete response.info.aggType;

        const [e, agg] = await getModelAggregations(app, modelInfo.aggType, modelId);

        if (e) {
          ctx.status = 500;

          if (isDevelopment()) {
            ctx.body = e; return;
          }

          return;
        } else if (null !== agg) {
          response.agg = {type: modelInfo.aggType};
          response.agg.first = agg;
        }
      }

      response.images = await getModelImages([modelId], app);

      if (response.images[modelId]) {
        response.images = response.images[modelId];
      } else {
        delete response.images;
      }

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
      bm.aggregation_type AS aggType,
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
        } else {
          const {0: result} = results;

          resolve(result);
        }
      }

      app.mysql.connection.query(qs, modelId, cb(resolve, reject));
    });

    if (undefined === info) return [null, null];

    const response = {
      title: modelHelper.getTitle(modelId, languageId, info),
      h1: modelHelper.getH1(modelId, languageId, info)
    };

    if (info.aggType) {
      response.aggType = info.aggType
    }

    return [null, response];
  } catch (e) {
    return [e];
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
