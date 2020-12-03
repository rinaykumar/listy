const express = require('express');
const axios = require('axios');
const sharp = require('sharp');
const multer = require('multer');
const imageProcessor = require('./imageProcessor');

const storage = multer.diskStorage();
const uploader = multer({ storage });
const port = 4001;

const app = express();

app.get('/api/imageUpload', (req, res) => {
  setTimeout(() => {
    res.send('hello world from ImageUpload');
  }, 3000);
});

app.get(
  '/createImage',
  uploader.single('imageUpload'),
  async (req, res, next) => {
    console.log(req.file);
    console.log(req.body);
    await imageProcessor(req, userId, title, description, type, price, inquiry);
    res.send('Images was successfully created');
  }
);

app.listen(port, console.log(`ImageUpload server listening on port ${port}`));
