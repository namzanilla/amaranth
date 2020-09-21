module.exports = (app) => {
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
  };
};

