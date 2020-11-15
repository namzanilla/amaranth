module.exports = (app) => {
  const getMainImagesByProductIds = (productIds) => {
    if (!Array.isArray(productIds)) return {};
    if (!productIds.length) return {};

    return new Promise((resolve, reject) => {
      const qs = `
      select
         i.*,
         p2i.product_id,
         fe.name fe_name
      from image i
      inner join product2image
      p2i on i.id = p2i.image_id
      inner join filename_extension fe
      on i.filename_extension_id = fe.id
      where p2i.product_id in (${productIds.join(',')})
      and p2i.is_main=1
      `;

      app.mysql.connection.query(qs, (error, results) => {
        if (error) {
          reject(error);
        }

        const result = {};

        for (let el of results) {
          const {
            product_id,
            url_path,
            name,
            fe_name,
          } = el;

          result[product_id] = `${url_path}${name}_305_305.${fe_name}`;
        }

        resolve(result);
      });
    });
  }

  const setProductsListImages = async (list) => {
    const productIds = list.map(({id}) => id);
    let images = await getMainImagesByProductIds(productIds);
    list.forEach((el) => {
      const {id} = el;
      const {
        [id]: image,
      } = images;

      if (image)
        el.image = image;
    });
  }

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

    await setProductsListImages(list);
    
    return {
      total,
      list,
    }
  };

  return {
    getProducts,
    getMainImagesByProductIds,
  };
};

