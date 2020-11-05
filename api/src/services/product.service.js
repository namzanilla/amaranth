module.exports = (app) => {
  const getProductId = async (productId, languageId) => {
    const metaList = await getMetaByProductId(productId, languageId);

    const meta = {};

    for (let el of metaList) {
      const {
        key_id,
        value_id,
        value,
      } = el;

      meta[key_id] = {
        id: value_id,
        value,
      };
    }
    
    return {meta};
  }

  const getMetaByProductId = async (productId, languageId) => {
    const qs = `
      SELECT
        mk.id key_id,
        p2mv.meta_value_id value_id,
        dt.name dataTypeName,
        mk.name \`key\`,
        mv.name value
      FROM product2meta_value p2mv
      INNER JOIN meta_value mv
      ON mv.id=p2mv.meta_value_id
      INNER JOIN data_type dt
      ON dt.id=mv.data_type_id
      INNER JOIN meta_key mk
      ON mk.id=mv.meta_key_id
      WHERE p2mv.product_id=?
    `;

    return new Promise((resolve, reject) => {
      app.mysql.connection.query(qs, productId, (error, results) => {
        if (error) {
          reject(error);
        }

        results.map((el) => {
          const {
            dataTypeName,
          } = el;

          if ('uint' === dataTypeName || 'int' === dataTypeName) {
            el.value = parseInt(el.value);
          }

          delete el.dataTypeName;
        });

        resolve(results);
      });
    });
  };

  const getBrandByProductId = async (productId) => {
    const sql = `
      SELECT
        mv.id,
        mv.name
      FROM meta_value mv
      INNER JOIN meta_key mk
      ON mv.meta_key_id = mk.id
      INNER JOIN product2meta_value p2mv
      ON mv.id = p2mv.meta_value_id
      INNER JOIN product p
      ON p2mv.product_id = p.id
      WHERE mk.name='product_brand'
      AND p.id=?
    `;

    return new Promise((resolve, reject) => {
      app.mysql.connection.query(sql, productId, (error, results) => {
        if (error) {
          reject(error);
        }

        const {
          [0]: result = {},
        } = results;

        resolve(result);
      });
    });
  }

  return {
    getProductId,
    getMetaByProductId,
    getBrandByProductId,
  };
};

