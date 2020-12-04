const brandMetaKey = 'product_brand';

module.exports = (app) => {
  const getMetaKeyId = async (metaKey) => {
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
  };

  const getBrandById = async (brandId) => {
    let metaKeyId
    try {
      metaKeyId = await getMetaKeyId(brandMetaKey);
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
  };

  const getBrandList = async () => {
    let metaKeyId
    try {
      metaKeyId = await getMetaKeyId(brandMetaKey);
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
  }

  return {
    getBrandList,
    getBrandById,
  };
};

