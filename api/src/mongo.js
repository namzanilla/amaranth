const {MongoClient} = require('mongodb');
const {
  MONGO_INITDB_ROOT_USERNAME,
  MONGO_INITDB_ROOT_PASSWORD,
} = process.env;
const uri = `mongodb://${MONGO_INITDB_ROOT_USERNAME}:${MONGO_INITDB_ROOT_PASSWORD}@127.0.0.1:27017`;
const client = new MongoClient(uri, {
  useUnifiedTopology: true,
});

module.exports = async (app) => {
  try {
    await client.connect();

    app.mongo = {};
    app.mongo.client = client;
  } finally {
    await client.close();
  }
}
