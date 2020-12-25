const brandMetaKey = 'product_brand';
const sh = require('../helpers/service');

module.exports = (app) => {
  return {
    getBrandList: getBrandList(app),
    getBrandById: getBrandById(app),
    getModelList: getModelList(app),
  };
};

function getModelList(app) {
  const serviceName = 'brand:getModelList';

  return async function(brandId) {
    try {
      const brand = await getBrandById(app)(brandId);

      return sh.posResponse(serviceName, brand);
    } catch (e) {
      console.error(e);

      return sh.negResponse(serviceName, e);
    }
  }
}

function getMetaKeyId(app) {
  return async function(metaKey) {
    try {
      const sql = `
      SELECT
        mk.id
      FROM meta_key mk
      WHERE mk.name=?
    `;

      return new Promise((resolve, reject) => {
        app.mysql.connection.query(sql, metaKey, (error, results) => {
          if (error) {
            reject(error);
          }

          const {
            [0]: {
              id,
            } = {},
          } = results;

          resolve(id);
        });
      });
    } catch (e) {
      console.error(e);
    }
  }
}

function getBrandById(app) {
  return async function(brandId) {
    try {
      let metaKeyId
      try {
        metaKeyId = await getMetaKeyId(app)(brandMetaKey);
      } catch (e) {
        console.log(e);
        return {};
      }

      if (!metaKeyId) return {};

      const sql = `
          SELECT
            mv.id,
            mv.name
          FROM meta_value mv
          WHERE mv.id=?
          AND mv.meta_key_id=?
        `;

      return new Promise((resolve, reject) => {
        app.mysql.connection.query(sql, [brandId, metaKeyId], (error, results) => {
          if (error) {
            reject(error);
          }

          const {
            [0]: result = {},
          } = results;

          resolve(result);
        });
      });
    } catch (e) {
      console.error(e);
    }
  }
}

function getBrandList(app) {
  return async function() {
    try {
      let metaKeyId
      try {
        metaKeyId = await getMetaKeyId(app)(brandMetaKey);
      } catch (e) {
        console.log(e);
        return [];
      }

      if (!metaKeyId) return [];

      const sql = `
          SELECT
            mv.id,
            mv.name
          FROM meta_value mv
          WHERE mv.meta_key_id=?
          ORDER BY mv.name
        `;

      return new Promise((resolve, reject) => {
        app.mysql.connection.query(sql, metaKeyId, (error, results) => {
          if (error) {
            reject(error);
          }

          resolve(results);
        });
      });
    } catch(e) {
      console.error(e);
    }
  }
}
