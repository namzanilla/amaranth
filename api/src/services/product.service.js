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
    getProductList: getProductList(app),
    getMainImagesByProductIds: getMainImagesByProductIds(app),
  };
};

function getProductList(app) {
  return async function(query) {
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

    await setProductsListImages(app)(list);

    return {
      total,
      list,
    }
  }
}

function setProductsListImages(app) {
  return async function(list) {
    const productIds = list.map(({id}) => id);
    let images = await getMainImagesByProductIds(app)(productIds);
    list.forEach((el) => {
      const {id} = el;
      const {
        [id]: image,
      } = images;

      if (image)
        el.image = image;
    });
  }
}

function getMainImagesByProductIds(app) {
  return function(productIds) {
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
}
