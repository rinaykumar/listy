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
// const imageProcessor = require("./imageProcessor");
const KafkaProducer = require("./kafka/KafkaProducer.js");
const producer = new KafkaProducer("myTopic");

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
    // console.log("MIME: " + req.file.mimetype);
    // console.log("STR = " + str + " FILEPATH = " + filePath);
    producer.connect(() => {
      console.log("connected to Kafka");
      // console.log("MIME: " + req.file.mimetype);
      producer.send(
        "Image Processor |" +
          filePath +
          "|FILENAME|" +
          str +
          "|" +
          req.body.id +
          "|" +
          req.file.mimetype
      );
    });

    // passing uploaded file path and the filename to image processor for resizing
    // await imageProcessor(filePath, str);

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

        const newListing = {
          listingID: req.body.id,
          listingTitle: req.body.title,
          listingType: req.body.type,
          listingDescription: req.body.description,
          listingPrice: req.body.price,
          listingImage: finalImg,
          // listingImage100: null,
          // listingImage500: null,
        };
        // Insert is also async, does not happen instantly
        return listingCollection.insertOne(newListing); // Chain a promise
      })
      .then((result) => {
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
