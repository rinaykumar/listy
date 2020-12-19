const sharp = require("sharp");

const imageProcessor = async (filePath, str) => {
  try {
    await sharp(filePath)
      .resize({ width: 100, height: 100 })
      .jpeg({ quality: 50 })
      .toFile("./uploads/" + str + "_100.jpeg");

    await sharp(filePath)
      .resize({ width: 500, height: 500 })
      .jpeg({ quality: 100 })
      .toFile("./uploads/" + str + "_500.jpeg");
  } catch (err) {
    console.log("Unable to process Image" + err);
  }
};

module.exports = imageProcessor;
