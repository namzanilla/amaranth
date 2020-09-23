module.exports = (app) => {
  const getBrandByProductId = async (productId) => {
    const sql = `
        SELECT
          b.id,
          b.name
        FROM brand b
        INNER JOIN product2brand p2b
        ON b.id = p2b.brand_id
        INNER JOIN product p
        on p2b.product_id = p.id
        WHERE p.id=?
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

