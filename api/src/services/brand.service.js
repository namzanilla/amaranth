module.exports = (app) => {
  const getById = async (brandId) => {
    const sql = `
        SELECT
          b.id,
          b.name
        FROM brand b
        WHERE b.id=?
    `;

    return new Promise((resolve, reject) => {
      app.mysql.connection.query(sql, [brandId], async (error, results) => {
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

  const getList = async () => {
    const sql = `
        SELECT
          b.id,
          b.name
        FROM brand b
        ORDER BY b.name
    `;

    return new Promise((resolve, reject) => {
      app.mysql.connection.query(sql, async (error, results) => {
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

