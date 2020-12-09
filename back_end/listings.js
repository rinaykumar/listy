const express = require("express");
// const axios = require("axios");
const port = 4002;
const cors = require("cors");
const path = require("path");
const MongoDB = require("./mongo");
const multer = require("multer"); // to process form-data
const storage = require("./multerUpload.js"); // to process image using multer
const upload = multer(storage);
const fs = require("fs");
const imageProcessor = require("./imageProcessor");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

MongoDB.connectDB((error) => {
  if (error) {
    console.log(error);
    process.exit(1); // Exit if connecion fails
  }
  // Connection successful
  console.log("Connection worked");
  const db = MongoDB.getDB();
  const listingCollection = db.collection("listings"); // Listings collection

  // Get listings endpoint
  app.get("/api/getListings", (req, res) => {
    // Network call
    listingCollection
      .find({})
      .toArray() // Convert documents found to JS array
      .then((listings) => {
        res.send(listings);
        // console.log(listings);
      })
      .catch((e) => {
        console.log(e);
        res.send("Failed");
      });
  });

  // Post listing endpoint
  app.post("/api/postListing", upload.single("file"), async (req, res) => {
    let str = path.parse(req.file.filename).name; // to get the filename without extension
    let filePath = req.file.path;
    // passing uploaded file path and the filename to image processor for resizing
    await imageProcessor(filePath, str);

    const listingMatcher = {
      listingID: req.body.id,
    };
    listingCollection
      .findOne(listingMatcher)
      .then((result) => {
        if (result) {
          return Promise.reject("Listing already exists");
        }
        // store Original Image to Mongo
        let img = fs.readFileSync(req.file.path);
        let encode_img = img.toString("base64");
        // define JSON object for the image
        let finalImg = {
          contentType: req.file.mimetype,
          // path: req.file.path,
          image: Buffer.from(encode_img, "base64"),
        };
        // store 100x100 Image to Mongo
        let fileName = "./uploads/" + str + "_100.jpeg";
        img = fs.readFileSync(fileName);
        encode_img = img.toString("base64");
        let finalImg100 = {
          contentType: req.file.mimetype,
          // path: req.file.path,
          image: Buffer.from(encode_img, "base64"),
        };
        // store 500x500 Image to Mongo
        fileName = "./uploads/" + str + "_500.jpeg";
        img = fs.readFileSync(fileName);
        encode_img = img.toString("base64");
        let finalImg500 = {
          contentType: req.file.mimetype,
          // path: req.file.path,
          image: Buffer.from(encode_img, "base64"),
        };
        const newListing = {
          listingID: req.body.id,
          listingTitle: req.body.title,
          listingType: req.body.type,
          listingDescription: req.body.description,
          listingPrice: req.body.price,
          listingImage: finalImg,
          listingImage100: finalImg100,
          listingImage500: finalImg500,
        };
        // Insert is also async, does not happen instantly
        return listingCollection.insertOne(newListing); // Chain a promise
      })
      .then((result) => {
        // to delete the images uploaded in the /uploads folder
        const directory = "uploads";
        fs.readdir(directory, (err, files) => {
          if (err) throw err;
          for (const file of files) {
            // console.log("Uploads deleted 1");
            fs.unlink(path.join(directory, file), (err) => {
              if (err) throw err;
              // console.log("Uploads deleted");
            });
          }
        });
        res.send("Listing has been inserted");
      })
      .catch((e) => {
        console.log(e);
        res.send(e);
      });
  });

  // delete /api/deleteListing?id=<id>
  app.delete("/api/deleteListing", (req, res) => {
    const listingMatcher = {
      listingID: req.query.id,
    };
    listingCollection
      .findOne(listingMatcher)
      .then((result) => {
        if (!result) {
          return Promise.reject("No Listing with the given ID");
        }
        return listingCollection.deleteOne(result); // Chain a promise
      })
      .then((result) => {
        listingCollection
          .find({})
          .toArray() // Convert documents found to JS array
          .then((listings) => {
            res.send(listings);
          })
          .catch((e) => {
            console.log(e);
            res.send("Failed");
          });
      })
      .catch((e) => {
        console.log(e);
        res.send(e);
      });
  });

  app.listen(
    port,
    console.log(`Authentication server listening on port ${port}`)
  );
});
