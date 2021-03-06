const express = require('express');
const axios = require('axios');
const port = 4001;
const MongoDB = require('./mongo');
const session = require('express-session');
var MongoDBStore = require('connect-mongodb-session')(session);

// const MongoStore = require('connect-mongo')(session);

const app = express();

var store = new MongoDBStore({
  uri: 'mongodb://localhost:27017',
  databaseName: 'Listy',
  collection: 'mySessions',
});

// Catch errors
store.on('error', function (error) {
  console.log(error);
});

// app.use(
//   require('express-session')({
//     secret: 'This is a secret',
//     cookie: {
//       maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
//     },
//     store: store,
//     resave: true,
//     saveUninitialized: true,
//   })
// );

MongoDB.connectDB((error) => {
  if (error) {
    console.log(error);
    process.exit(1); // Exit if connecion fails
  }
  // Connection successful
  console.log('Connection worked');
  const db = MongoDB.getDB();
  const userCollection = db.collection('users'); // Users collection

  // Login endpoint
  app.get('/auth/logIn', (req, res) => {
    const matcher = {
      userName: req.query.userName,
      password: req.query.password,
    };
    userCollection
      .findOne(matcher)
      .then((result) => {
        if (result) {
          // req.session.username = userName;
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
        res.redirect('/login');
      });
  });

  // Register endpoint, might have to be post not get
  app.get('/auth/register', (req, res) => {
    if (!req.query.userName || !req.query.password || !req.query.isAdmin) {
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
          isAdmin: req.query.isAdmin,
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
  });
  app.listen(
    port,
    console.log(`Authentication server listening on port ${port}`)
  );
});
