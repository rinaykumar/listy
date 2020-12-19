const fs = require("fs");
const path = require("path");
const MongoDB = require("./mongo");
const imageProcessor = require("./imageProcessor");

const redis = require("redis");
const publisher = redis.createClient();

const KafkaConsumer = require("./kafka/KafkaConsumer");
const consumer = new KafkaConsumer(["myTopic"]);

consumer.on("message", async (message) => {
  console.log("Message received on Kafka ");
  let strng = JSON.parse(message.value);
  // console.log(strng.length);
  let result = strng.split("|");
  let filePath = result[1];
  let str = result[3];
  await imageProcessor(filePath, str);
  // await new Promise((resolve) => setTimeout(resolve, 5000));

  // setTimeout(() => {
  MongoDB.connectDB((error) => {
    if (error) {
      console.log(error);
      process.exit(1); // Exit if connecion fails
    }
    // Connection successful
    console.log("Connection worked");
    const db = MongoDB.getDB();
    const listingCollection = db.collection("listings"); // Listings collection
    // store 100x100 Image to Mongo
    let fileName = "./uploads/" + str + "_100.jpeg";
    img = fs.readFileSync(fileName);
    encode_img = img.toString("base64");
    let finalImg100 = {
      contentType: result[5],
      image: Buffer.from(encode_img, "base64"),
    };
    // store 500x500 Image to Mongo
    fileName = "./uploads/" + str + "_500.jpeg";
    img = fs.readFileSync(fileName);
    encode_img = img.toString("base64");
    let finalImg500 = {
      contentType: result[5],
      image: Buffer.from(encode_img, "base64"),
    };
    let myquery = { listingID: result[4] };
    let newvalues = {
      $set: {
        listingImage100: finalImg100,
        listingImage500: finalImg500,
      },
    };
    listingCollection
      .updateOne(myquery, newvalues)
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
        // res.send("Listing has been updated");
        console.log("Long Task Complete");
      })
      .catch((e) => {
        console.log(e);
        // res.send(e);
      });
  });
  const userMsg = {
    userID: "admin",
    listingID: result[4],
    text: "Completed Processing",
    // finalImg100: finalImg100,
    // finalImg500: finalImg500,
  };
  // setTimeout(() => {
  publisher.publish("processImage", JSON.stringify(userMsg));
  // }, 5000);
});
consumer.connect();
