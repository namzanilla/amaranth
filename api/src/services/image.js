module.exports = (app) => {
  return {
    getImagesByProductIds: getImagesByProductIds(app),
  };
};

function getImagesByProductIds(app) {
  return async function(productIds) {
    try {
      const result = {};
      const images = await new Promise((resolve, reject) => {
        const qs = `
          SELECT
            p.id AS productId,
            i.path,
            i.name,
            p2i.is_main,
            fe.name as ext
          FROM product p
          
          INNER JOIN product2image p2i
          ON p2i.product_id=p.id
          
          INNER JOIN image i
          ON i.id=p2i.image_id
          
          INNER JOIN filename_extension fe
          ON fe.id=i.filename_extension_id
          
          WHERE p.id IN (${productIds.join(',')})
          
          ORDER BY p2i.is_main DESC
        `;

        const cb = (resolve, reject) => (error, results) => {
          if (error) reject(error);

          resolve(results);
        }

        app.mysql.connection.query(qs, cb(resolve, reject));
      });

      for (const image of images) {
        const {productId} = image;
        delete image.productId;
        result[productId] = result[productId] ? result[productId] : [];
        result[productId].push(image);
      }

      return [null, result];
    } catch (e) {
      console.error(e);

      return [e];
    }
  }
}
