module.exports = (app) => {
  const getById = (brandId) => {
    const sql = `
        SELECT
          b.id,
          b.name
        FROM brand b
        WHERE b.id=?
    `;

    return new Promise((resolve, reject) => {
      app.mysql.connection.query(sql, [brandId], (error, results) => {
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

  const getList = () => {
    const sql = `
        SELECT
          b.id,
          b.name
        FROM brand b
        ORDER BY b.name
    `;

    return new Promise((resolve, reject) => {
      app.mysql.connection.query(sql, (error, results) => {
        if (error) {
          reject(error);
        }

        resolve(results);
      });
    });
  }

  return {
    getList,
    getById,
  };
};

