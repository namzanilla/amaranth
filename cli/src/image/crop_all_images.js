require('./../dotenv')
const {execSync} = require('child_process')
require('./../mysql')(async (mysqlConn) => {
  try {
    const imageIds = await getImageIds(mysqlConn)

    const path = require('path').resolve(__dirname, 'crop_image_by_id.js')

    for (const imageId of imageIds) {
      execSync(`node ${path} ${imageId}`)
    }
  } catch (e) {
    console.error(e)
  }
})

function getImageIds(mysqlConn) {
  return new Promise((resolve, reject) => {
    const qs = `
      SELECT id FROM image
    `
    const cb = (resolve, reject) => (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results.map(({id}) => id));
      }
    }

    mysqlConn.query(qs, cb(resolve, reject))
  })
}
