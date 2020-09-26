module.exports = (app) => {
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
      app.mysql.connection.query(sql, [productId], (error, results) => {
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
    getBrandByProductId,
  };
};

