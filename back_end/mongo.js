const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017';
let dbName;

const connectDB = async (callback) => {
  try {
    MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
      dbName = client.db('Listy');
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
