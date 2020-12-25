module.exports = (app) => {
  const getMetaObjByMetaAr = (meta) => {
    const response = {};

    for (const el of meta) {
      const {key_id} = el;
      response[key_id] = el;
    }

    return response;
  }

  const getProductIdH1ByMeta = async (metaObj, languageId) => {
    const {
      1: {
        value: brandName,
      } = {},
      4: {
        value_id: modelId,
        value: modelName,
      } = {},
    } = metaObj;

    if (modelId === 1) { // Gold Standard 100% Whey
      let {
        3: {
          value: PRODUCT_FLAVOR,
        } = {},
        2: {
          value: PRODUCT_NET_WEIGHT_GRAMM,
        } = {},
      } = metaObj;

      const kg = PRODUCT_NET_WEIGHT_GRAMM / 1000;

      if (kg > 1) {
        PRODUCT_NET_WEIGHT_GRAMM = `${kg} кг`;
      } else {
        PRODUCT_NET_WEIGHT_GRAMM = `${PRODUCT_NET_WEIGHT_GRAMM} г`;
      }

      if (languageId === 1) {
        let h1 = 'Сироватковий протеїн ';
        h1 += `${brandName}, ${modelName} зі смаком "${PRODUCT_FLAVOR}" (${PRODUCT_NET_WEIGHT_GRAMM})`

        return h1;
      } else if (languageId === 2) {
        let h1 = 'Сывороточный протеин ';
        h1 += `${brandName}, ${modelName} со вкусом "${PRODUCT_FLAVOR}" (${PRODUCT_NET_WEIGHT_GRAMM})`

        return h1;
      }

    } else if (modelId === 100) { // Opti-Men
      const {
        7: {
          value: PACKAGE_QUANTITY_PIECES,
        } = {},
      } = metaObj;

      if (languageId === 1) {
        let h1 = 'Вітаміни ';
        h1 += `${brandName}, ${modelName} (${PACKAGE_QUANTITY_PIECES} шт.)`;

        return h1;
      } else if (languageId === 2) {
        let h1 = 'Витамины ';
        h1 += `${brandName}, ${modelName} (${PACKAGE_QUANTITY_PIECES} шт.)`;

        return h1;
      }
    } else if (modelId === 101) { // Opti-Women
      const {
        7: {
          value: PACKAGE_QUANTITY_PIECES,
        } = {},
      } = metaObj;

      if (languageId === 1) {
        let h1 = 'Вітаміни ';
        h1 += `${brandName}, ${modelName} (${PACKAGE_QUANTITY_PIECES} шт.)`;

        return h1;
      } else if (languageId === 2) {
        let h1 = 'Витамины ';
        h1 += `${brandName}, ${modelName} (${PACKAGE_QUANTITY_PIECES} шт.)`;

        return h1;
      }
    }

    return '';
  }

  const getMetaByProductId = async (productId, languageId) => {
    const qs = `
      SELECT
        mk.id key_id,
        p2mv.meta_value_id value_id,
        dt.name dataTypeName,
        mk.name \`key\`,
        mv.name value,
        mv.name_trans_${languageId} valueTrans
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
        } else {
          results.map((el) => {
            const {
              dataTypeName,
              valueTrans,
            } = el;

            if ('uint' === dataTypeName || 'int' === dataTypeName) {
              el.value = parseInt(el.value);
            }

            if (valueTrans) {
              el.value = valueTrans;
              delete el.valueTrans;
            }

            delete el.dataTypeName;
          });

          resolve(results);
        }
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
    getMetaObjByMetaAr,
    getProductIdH1ByMeta,
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
