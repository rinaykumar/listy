const MongoClient = require("mongodb").MongoClient;
// const express = require('express');
// const path = require('path');
// const cors = require("cors");
// const multer = require('multer'); // to process form-data
// const storage = require('./multerUpload.js'); // to process image using multer
// const upload = multer(storage);
// const fs = require('fs');
// const imageProcessor = require("./imageProcessor");

const url = "mongodb://localhost:27017";
let dbName;

const connectDB = async (callback) => {
  try {
    MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
      dbName = client.db("Listy");
      return callback(err);
    });
  } catch (e) {
    throw e;
  }
};

const getDB = () => dbName;

const disconnectDB = () => dbName.close();

// app.listen(port, () => console.log(`App listening on port ${port}`));

module.exports = { connectDB, getDB, disconnectDB };

// client.connect((error) => {
//   if (error) {
//     console.log(error);
//     process.exit(1); // Exit if connecion fails
//   }
//   // Connection successful
//   console.log('Connection worked');

//   // Get references to db and collection
//   const db = client.db(dbName);
//   const userCollection = db.collection('users'); // Users collection
//   const listingCollection = db.collection('listings'); // Listings collection
//   const inquiryCollection = db.collection('inquiries'); // Inquiries collection
//   // not using imageCollection
//   const imageCollection = db.collection('images'); // Images collection

//   // Login endpoint
//   app.get('/logIn', (req, res) => {
//     const matcher = {
//       userName: req.query.userName,
//       password: req.query.password,
//     };
//     userCollection
//       .findOne(matcher)
//       .then((result) => {
//         if (result) {
//           return res.send({
//             success: true,
//           });
//         }
//         return res.send({
//           success: false,
//           error: 'Username or password invalid',
//         });
//       })
//       .catch((e) => {
//         console.log(e);
//         res.send('Failed');
//       });
//   });

//   // Register endpoint, might have to be post not get
//   app.get('/register', (req, res) => {
//     if (!req.query.userName || !req.query.password) {
//       return res.send('Username and password must be entered');
//     }
//     const matcher = {
//       userName: req.query.userName,
//     };
//     userCollection
//       .findOne(matcher)
//       .then((result) => {
//         if (result) {
//           // Manually reject promise (throw)
//           // Jump to next catch, skip all .then's
//           return Promise.reject('Sorry username already taken');
//           // Promise.resolve(); - Manually trigger sucess
//         }
//         // res.send('TODO: Make user')
//         const newUser = {
//           userName: req.query.userName,
//           password: req.query.password,
//         };
//         // Insert is also async, does not happen instantly
//         return userCollection.insertOne(newUser); // Chain a promise
//       })
//       .then((result) => {
//         // User has been inserted
//         res.send('User has been inserted');
//       })
//       .catch((e) => {
//         console.log(e);
//         res.send(e);
//       });
//   });

//   // Get listings endpoint
//   app.get('/api/getListings', (req, res) => {
//     // Network call
//     listingCollection
//       .find({})
//       .toArray() // Convert documents found to JS array
//       .then((listings) => {
//         res.send(listings);
//         // console.log(listings);
//       })
//       .catch((e) => {
//         console.log(e);
//         res.send('Failed');
//       });
//   });

// // Post listing endpoint, might have to be post not get
// app.post('/api/postListing', upload.single('file'), async (req, res) => {
//   let str = path.parse(req.file.filename).name; // to get the filename without extension
//   let filePath = req.file.path;
//   // passing uploaded file path and the filename to image processor for resizing
//   await imageProcessor(filePath, str);

//   const listingMatcher = {
//     listingID: req.body.id,
//   };
//   listingCollection
//     .findOne(listingMatcher)
//     .then((result) => {
//       if (result) {
//         return Promise.reject('Listing already exists');
//       }
//       // store Original Image to Mongo
//       let img = fs.readFileSync(req.file.path);
//       let encode_img = img.toString('base64');
//       // define JSON object for the image
//       let finalImg = {
//         contentType: req.file.mimetype,
//         // path: req.file.path,
//         image: Buffer.from(encode_img, 'base64'),
//       };
//       // store 100x100 Image to Mongo
//       let fileName = './uploads/' + str + '_100.jpeg';
//       img = fs.readFileSync(fileName);
//       encode_img = img.toString('base64');
//       let finalImg100 = {
//         contentType: req.file.mimetype,
//         // path: req.file.path,
//         image: Buffer.from(encode_img, 'base64'),
//       };
//       // store 500x500 Image to Mongo
//       fileName = './uploads/' + str + '_500.jpeg';
//       img = fs.readFileSync(fileName);
//       encode_img = img.toString('base64');
//       let finalImg500 = {
//         contentType: req.file.mimetype,
//         // path: req.file.path,
//         image: Buffer.from(encode_img, 'base64'),
//       };
//       const newListing = {
//         listingID: req.body.id,
//         listingTitle: req.body.title,
//         listingType: req.body.type,
//         listingDescription: req.body.description,
//         listingPrice: req.body.price,
//         listingImage: finalImg,
//         listingImage100: finalImg100,
//         listingImage500: finalImg500,
//       };
//       // Insert is also async, does not happen instantly
//       return listingCollection.insertOne(newListing); // Chain a promise
//     })
//     .then((result) => {
//       res.send('Listing has been inserted');
//     })
//     .catch((e) => {
//       console.log(e);
//       res.send(e);
//     });
// });

// // Get inquiries endpoint
// app.get('/api/getInquiries', (req, res) => {
//   // Network call
//   inquiryCollection
//     .find({})
//     .toArray() // Convert documents found to JS array
//     .then((inquiries) => {
//       if (req.query.listingId) {
//         // console.log(req.query.listingId);
//         const found = inquiries.some(
//           (inquiry) => inquiry.listingID == req.query.listingId
//         );
//         if (found) {
//           let filterInquiries = inquiries.filter(
//             (inquiry) => inquiry.listingID == req.query.listingId
//           );
//           // console.log(filterInquiries);
//           res.send(filterInquiries);
//         }
//       }
//     })
//     .catch((e) => {
//       console.log(e);
//       res.send('Failed');
//     });
// });

// Post inquiry, might have to be post not get
// app.post('/api/postInquiry', (req, res) => {
//   const inquiry = {
//     listingID: req.query.listingId,
//     inquiryMessage: req.body.message,
//   };
//   inquiryCollection
//     .insertOne(inquiry)
//     .then(() => {
//       // Inquiry has been inserted
//       res.send('Inquiry has been inserted');
//     })
//     .catch((e) => {
//       console.log(e);
//       res.send(e);
//     });
// });

// // Get images endpoint
// // ASSUMING: Images have been processed and inserted into mongo collection
// app.get('/api/getImages', (req, res) => {
//   // Network call
//   imageCollection
//     .find({})
//     .toArray() // Convert documents found to JS array
//     .then((images) => {
//       res.send(images);
//     })
//     .catch((e) => {
//       console.log(e);
//       res.send('Failed');
//     });
// });

// // Post image endpoint, might have to be post not get
// // ASSUMING: Images have been processed then sent to the endpoint
// app.get('/postImage', (req, res) => {
//   const processedImage = {
//     imageID: req.query.id, // This would be the ID of the listing the image belongs to
//     imageData: req.query.image, // This should(?) be the processed image data in base64
//   };

//   imageCollection
//     .insertOne(prcessedImage)
//     .then(() => {
//       // Image has been inserted
//       res.send('Image has been inserted');
//     })
//     .catch((e) => {
//       console.log(e);
//       res.send(e);
//     });
// });

// });
