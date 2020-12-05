const { MongoClient } = require('mongodb');
const express = require('express');

const url = 'mongodb://localhost:27017';
const dbName = 'Listy';
const redis = require('redis');
const redisClient = redis.createClient();

const mongoClient = new MongoClient(url);

mongoClient.connect((error) => {
  if (error) {
    console.log(error);
    process.exit(1); // Exit if connecion fails
  }
  // Connection successful
  console.log('Connection worked');
  const app = express();
  app.use(cors());
  app.use(express.json());
  // Get references to db and collection
  const db = client.db(dbName);
  const userCollection = db.collection('users'); // Users collection
  const listingCollection = db.collection('listings'); // Listings collection
  const inquiryCollection = db.collection('inquiries'); // Inquiries collection
  const imageCollection = db.collection('images'); // Images collection

  // Login endpoint
  app.get('/logIn', (req, res) => {
    const matcher = {
      userName: req.query.userName,
      password: req.query.password,
    };
    userCollection
      .findOne(matcher)
      .then((result) => {
        if (result) {
          return res.send({
            success: true,
          });
        }
        return res.send({
          success: false,
          error: 'Username or password invalid',
        });
      })
      .catch((e) => {
        console.log(e);
        res.send('Failed');
      });
  });

  // Register endpoint, might have to be post not get
  app.get('/register', (req, res) => {
    if (!req.query.userName || !req.query.password) {
      return res.send('Username and password must be entered');
    }
    const matcher = {
      userName: req.query.userName,
    };
    userCollection
      .findOne(matcher)
      .then((result) => {
        if (result) {
          // Manually reject promise (throw)
          // Jump to next catch, skip all .then's
          return Promise.reject('Sorry username already taken');
          // Promise.resolve(); - Manually trigger sucess
        }
        // res.send('TODO: Make user')
        const newUser = {
          userName: req.query.userName,
          password: req.query.password,
        };
        // Insert is also async, does not happen instantly
        return userCollection.insertOne(newUser); // Chain a promise
      })
      .then((result) => {
        // User has been inserted
        res.send('User has been inserted');
      })
      .catch((e) => {
        console.log(e);
        res.send(e);
      });
    const newUser = {
      userName: req.query.userName,
      password: req.query.password,
    };
  });

  // Get listings endpoint
  app.get('/getListings', (req, res) => {
    // Network call
    listingCollection
      .find({})
      .toArray() // Convert documents found to JS array
      .then((listings) => {
        res.send(listings);
      })
      .catch((e) => {
        console.log(e);
        res.send('Failed');
      });
  });

  // Post listing endpoint, might have to be post not get
  app.post('/postListing', (req, res) => {
    if (!req.query.userName || !req.query.password) {
      return res.send('Username and password must be entered');
    }
    const listingMatcher = {
      lisitngID: req.query.id,
    };

    listingCollection
      .findOne(listingMatcher)
      .then((result) => {
        if (result) {
          return Promise.reject('Listing already exists');
        }
        const newListing = {
          lisitngID: req.query.id,
          listingTitle: req.query.title,
          listingType: req.query.type,
          listingDescription: req.query.description,
          listingPrice: req.query.price,
        };
        // Insert is also async, does not happen instantly
        return listingCollection.insertOne(newListing); // Chain a promise
      })
      .then((result) => {
        // Listing has been inserted
        res.send('Listing has been inserted');
      })
      .catch((e) => {
        console.log(e);
        res.send(e);
      });
    const newListing = {
      lisitngID: req.query.id,
      listingTitle: req.query.title,
      listingType: req.query.type,
      listingDescription: req.query.description,
      listingPrice: req.query.price,
    };
  });

  // Get inquiries endpoint
  app.get('/getInquiries', (req, res) => {
    // Network call
    inquiryCollection
      .find({})
      .toArray() // Convert documents found to JS array
      .then((inquiries) => {
        res.send(inquiries.map((r) => r.data));
      })
      .catch((e) => {
        console.log(e);
        res.send('Failed');
      });
  });

  // Post inquiry, might have to be post not get
  app.post('/postInquiry', (req, res) => {
    console.log(req.body);
    const inquiry = {
      inquiryID: req.body.id,
      inquiryMessage: req.body.message,
    };

    inquiryCollection
      .insertOne(inquiry)
      .then(() => {
        // Inquiry has been inserted
        console.log('Inquiry insert worked!');
      })
      .catch((e) => {
        console.log(e);
      });
    redisClient.publish('newInquiry', inquiry);
    res.send('sent inquiry data to redis channel');
  });

  // Get images endpoint
  // ASSUMING: Images have been processed and inserted into mongo collection
  app.get('/getImages', (req, res) => {
    // Network call
    imageCollection
      .find({})
      .toArray() // Convert documents found to JS array
      .then((images) => {
        res.send(images);
      })
      .catch((e) => {
        console.log(e);
        res.send('Failed');
      });
  });

  // Post image endpoint, might have to be post not get
  // ASSUMING: Images have been processed then sent to the endpoint
  app.post('/postImage', (req, res) => {
    const processedImage = {
      imageID: req.query.id, // This would be the ID of the listing the image belongs to
      imageData: req.query.image, // This should(?) be the processed image data in base64
    };

    imageCollection
      .insertOne(processedImage)
      .then(() => {
        // Image has been inserted
        res.send('Image has been inserted');
      })
      .catch((e) => {
        console.log(e);
        res.send(e);
      });
    redisClient.publish('newImage', processedImage);
    res.send('sent image data to redis channel');
  });

  app.listen(4003, () => console.log('App listening on port 4003'));
});
