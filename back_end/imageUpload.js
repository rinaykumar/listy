const express = require('express');
const axios = require('axios');
const sharp = require('sharp');
const multer = require('multer');
const imageProcessor = require('./imageProcessor');
const port = 4002;

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './images');
  },
  filename: function (req, file, cb) {
    console.log(file);
    cb(null, file.originalname);
  },
});

var upload = multer({ storage: storage });

const app = express();

app.get(
  '/createImage',
  upload.single('imageUpload'),
  async (req, res, next) => {
    console.log(req.file);
    console.log(req.body);
    await imageProcessor(req, userId, title, description, type, price, inquiry);
    res.send('Images was successfully created');
  }
);

app.listen(port, console.log(`ImageUpload server listening on port ${port}`));
