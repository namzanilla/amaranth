/*
 * Скрипт смотрит в таблицу amaranth.image
 * и привязывает изображения
 * к amaranth.brand_model2image
 * и amaranth.product2image
 */

require('./../dotenv')
require('./../mysql')(async (mysqlConn) => {
  try {
    const productImages = await getImages(mysqlConn, 1)

    if (productImages.length) await insertImages(mysqlConn, productImages, 1)

    const modelImages = await getImages(mysqlConn, 2)

    if (modelImages.length) await insertImages(mysqlConn, modelImages, 2)

    process.exit(0)
  } catch (e) {
    console.error(e)
  }
})

async function insertImages(mysqlConn, images, type) {
  try {
    for (const image of images) {
      const id = image.path.split('/')[2]
      const image_id = image.id
      // const is_main = image.name === '1' ? 1 : 0
      const is_main = 0

      await new Promise((resolve, reject) => {
        const qs = type === 1
          ? `INSERT INTO product2image VALUES (?, ?, ?)`
          : `INSERT INTO brand_model2image VALUES (?, ?, ?)`

        const cb = (resolve, reject) => (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
        }

        mysqlConn.query(qs, [id, image_id, is_main], cb(resolve, reject))
      })
    }
  } catch (e) {
    console.error(e)
  }
}

function getImages(mysqlConn, type) {
  return new Promise((resolve, reject) => {
    let qs

    if (type === 1) {
      qs = `
        SELECT
          i.id,
          i.name,
          i.path
        FROM image i
        
        LEFT JOIN product2image p2i
        ON p2i.image_id=i.id
        
        WHERE i.type=1 AND p2i.image_id IS NULL
        GROUP BY i.id
      `;
    } else if (type === 2) {
      qs = `
        SELECT i.id,
          i.name,
          i.path
        FROM image i
        LEFT JOIN brand_model2image bm2i
        ON bm2i.image_id = i.id

        WHERE i.type=2 AND bm2i.image_id IS NULL
        GROUP BY i.id
      `;
    }

    const cb = (resolve, reject) => (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    }

    mysqlConn.query(qs, cb(resolve, reject))
  })
}
