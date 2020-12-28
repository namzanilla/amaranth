/*
 * Скрипт смотрит все изображения в папках
 * static/images/products, static/images/models
 * и в случае если какие то изображения не
 * находятся в таблице amaranth.image,
 * записывает их туда
 */

require('./../dotenv')
const fs = require('fs')
const {resolve} = require('path')
const imagesDir = resolve(__dirname, '../../../static/images')
const productsDir = resolve(imagesDir, 'products')
const modelsDir = resolve(imagesDir, 'models')

require('./../mysql')(async (mysqlConn) => {
  try {
    const ext = await getExt(mysqlConn)

    scan(mysqlConn, productsDir, ext, 1)
    scan(mysqlConn, modelsDir, ext, 2)
  } catch (e) {
    console.error(e)
  }
})

function scan(mysqlConn, productsDir, ext, type) {
  try {
    fs.readdirSync(productsDir).forEach((el) => {
      let path = resolve(productsDir, el)
      const stats = fs.statSync(path)

      if (stats.isDirectory()) {
        scan(mysqlConn, path, ext, type)
      } else {
        insertIfNotExists(mysqlConn, path, ext, type)
      }
    })
  } catch (e) {
    console.error(e)
  }
}

async function insertIfNotExists(mysqlConn, absolutePath, ext, type) {
  const pathInfo = getInfoFromPath(absolutePath, ext, type)
  
  if (!pathInfo) return false

  const {
    name,
    // fileName,
    path,
    // extName,
    filename_extension_id
  } = pathInfo

  const image = await getImage(mysqlConn, path, name, filename_extension_id)

  const {
    0: {
      id
    } = {}
  } = image;

  if (!id) {
    await insertImage(mysqlConn, path, name, filename_extension_id, type)
  }
}

function insertImage(mysqlConn, path, name, filename_extension_id, type) {
  return new Promise((resolve, reject) => {
    console.log({path, name, filename_extension_id, type})
    const qs = 'INSERT INTO image (path, name, filename_extension_id, type) VALUES (?, ?, ?, ?)'
    const cb = (resolve, reject) => (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    }

    mysqlConn.query(qs, [path, name, filename_extension_id, type], cb(resolve, reject))
  })
}



function getImage(mysqlConn, path, name, filename_extension_id) {
  return new Promise((resolve, reject) => {
    const qs = 'SELECT * FROM image WHERE path=? AND name=? AND filename_extension_id=?'
    const cb = (resolve, reject) => (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    }

    mysqlConn.query(qs, [path, name, filename_extension_id], cb(resolve, reject))
  })
}

function getInfoFromPath(absolutePath, ext, type) {
  try {
    const extName = absolutePath.split('.').pop()
    absolutePath = absolutePath.split('/')

    const {
      [extName]: filename_extension_id
    } = ext

    if (!filename_extension_id) {
      console.error('absolutePath: ', absolutePath)
      console.error('extName: ', extName)
      console.error('filename_extension_id: ', filename_extension_id)
      console.log('------------------------------------------')
      return null
    }

    let path

    if (type === 1) path = 'products'
    else if (type === 2) path = 'models'
    else {
      console.log('absolutePath:  ', absolutePath)
      console.log('invalid type: ', type)
      return null
    }

    const fileName = absolutePath[absolutePath.length - 1]
    const name = absolutePath[absolutePath.length - 1].split('.')[0]
    const id = absolutePath[absolutePath.length - 2]
    path += `/${id.slice(-1)}/${id}`

    return {
      name,
      fileName,
      path,
      extName,
      filename_extension_id
    }
  } catch (e) {
    console.error(e)
  }
}

async function getExt(mysqlConn) {
  return new Promise((resolve, reject) => {
    const qs = `
      SELECT * FROM filename_extension
    `

    const cb = (resolve, reject) => (error, results) => {
      if (error) {
        reject(error);
      } else {
        const out = {}

        for (const result of results) {
          out[result.name] = result.id
        }

        resolve(out)
      }
    }
    
    mysqlConn.query(qs, cb(resolve, reject))
  })
}
