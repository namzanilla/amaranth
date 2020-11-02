module.exports = (app) => {
  const getProducts = async (query) => {
    const limit = 12;
    let {
      cid: categoryId,
      o: offset = 0,
    } = query;

    offset = parseInt(offset);

    if (isNaN(offset)) {
      offset = 0;
    }

    let qsTotal = `
      SELECT count(p.id) count
      FROM product p
    `;
    
    let qs = `
      SELECT p.*
      FROM product p
    `;

    const qsParams = [];

    if (categoryId) {
      categoryId = parseInt(categoryId);

      if (!isNaN(categoryId)) {
        qs += `
          INNER JOIN product2category p2c
          ON (p2c.product_id=p.id AND p2c.category_id=?)
        `;

        qsTotal += `
          INNER JOIN product2category p2c
          ON (p2c.product_id=p.id AND p2c.category_id=?)
        `;

        qsParams.push(categoryId);
      }
    }

    const total = await new Promise((resolve, reject) => {
      app.mysql.connection.query(qsTotal, qsParams, (error, results) => {
        if (error) {
          reject(error);
        }

        const {
          0: {
            count,
          } = {},
        } = results;

        resolve(count);
      });
    });

    if (!total) {
      return {total};
    }

    console.log('total', total);
    
    qs += ` LIMIT ?, ?`;

    qsParams.push(offset);
    qsParams.push(limit);

    const list = await new Promise((resolve, reject) => {
      app.mysql.connection.query(qs, qsParams, (error, results) => {
        if (error) {
          reject(error);
        }

        resolve(results);
      });
    });

    return {
      total,
      list,
    }
  };

  return {
    getProducts,
  };
};

