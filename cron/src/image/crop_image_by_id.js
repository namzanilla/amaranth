const sharp = require('sharp');
const {resolve} = require('path');
require('./../dotenv');
const fs = require('fs');
const IMAGE_TYPE_PRODUCT = 1;
const IMAGE_TYPE_MODEL = 2;

require('./../mysql')(async (connection) => {
  try {
    let {
      2: imageId,
      // 3: width,
      // 4: height,
    } = process.argv;

    imageId = parseInt(imageId);
    // width = parseInt(width);
    // height = parseInt(height);

    if (isNaN(imageId)) process.exit(0);
    // if (isNaN(width)) process.exit(0);
    // if (isNaN(height)) process.exit(0);
    // if (width < 1) process.exit(0);
    // if (height < 1) process.exit(0);

    const image = await getImage(connection, imageId);

    if (!image.length) {
      console.log(`Image ${imageId} not found`);
      process.exit(0);
    }

    const {
      0: {
        path,
        name,
        type,
        fe_name,
      } = {},
    } = image;

    let outputDir, config;
    const srcDir = resolve(__dirname, '..', '..', '..', 'static', 'images', path);

    if (type === IMAGE_TYPE_PRODUCT) {
      outputDir = resolve(__dirname, '..', '..', '..', 'static', 'public', path);
    } else if (type === IMAGE_TYPE_MODEL) {
      outputDir = resolve(__dirname, '..', '..', '..', 'static', 'public', path);
      fs.mkdirSync(outputDir, { recursive: true });
      config = [
        {
          width: 320,
          height: 320,
        },
        {
          width: 480,
          height: 480,
        }
      ];

    }

    for (const conf of config) {
      const {width, height} = conf;
      const fileName = `${name}.${fe_name}`;
      const newFileName = `${name}_${width}x${height}.${fe_name}`;
      const file = resolve(srcDir, fileName);

      const fileOut = resolve(outputDir, newFileName);
      console.log('file', file);
      console.log('fileOut', fileOut);

      await sharp(file)
        .resize(width, height, {
          position: 'centre',
        })
        .toFile(fileOut);
    }

    console.log(image);
  } catch (e) {
    console.error(e);

    process.exit(0);
  }

  process.exit(0);
});

const getImage = (connection, imageId) => {
  return new Promise((resolve, reject) => {
    const qs = `select
       i.name,
       i.path,
       i.type,
       fe.name fe_name
    from image i
    inner join filename_extension fe
    on i.filename_extension_id = fe.id  
    where i.id = ?`;

    connection.query(qs, imageId, (error, results) => {
      if (error) {
        reject(error);
      }

      resolve(results);
    });
  });
}
