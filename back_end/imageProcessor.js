const sharp = require('sharp');

const imageProcessor = async (
  req,
  userId,
  title,
  description,
  type,
  price,
  inquiry
) => {
  let fileBuffer = req.file.buffer;
  try {
    await sharp(fileBuffer)
      .resize({ width: 100, height: 100 })
      .toFile('./images/uploads100');

    await sharp(fileBuffer)
      .resize({ width: 500, height: 500 })
      .toFile('./images/uploads500');
  } catch (error) {
    console.log('Error while processing an image. ', error);
  }
};

module.exports = imageProcessor;
