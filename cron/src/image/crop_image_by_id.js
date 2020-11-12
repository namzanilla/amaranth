const sharp = require('sharp');
const {resolve} = require('path');
require('./../dotenv');
require('./../mysql')(async (connection) => {
  try {
    let {
      2: imageId,
      3: width,
      4: height,
    } = process.argv;

    imageId = parseInt(imageId);
    width = parseInt(width);
    height = parseInt(height);

    if (isNaN(imageId)) process.exit(0);
    if (isNaN(width)) process.exit(0);
    if (isNaN(height)) process.exit(0);
    if (width < 1) process.exit(0);
    if (height < 1) process.exit(0);

    const image = await getImage(connection, imageId);

    if (!image.length) {
      console.log(`Image ${imageId} not found`);
      process.exit(0);
    }

    const {
      0: {
        path,
        name,
        fe_name,
      } = {},
    } = image;

    const fileName = `${name}.${fe_name}`;
    const newFileName = `${name}_${width}_${height}.${fe_name}`;
    const dir = resolve(__dirname, '..', '..', '..', 'static', 'images', path);
    const file = resolve(dir, fileName);

    const fileOut = resolve(dir+'_crop', newFileName);
    console.log('file', file);

    await sharp(file)
      .resize(width, height, {
        position: 'centre',
      })
      .toFile(fileOut);


    console.log(image);
  } catch (e) {
    console.log(e);
  }

  process.exit(0);
});

const getImage = (connection, imageId) => {
  return new Promise((resolve, reject) => {
    const qs = `select
       i.name,
       i.path,
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
