const redis = require('redis');
const client = redis.createClient();

module.exports = (app) => {
  client.on('error', function(error) {
    console.error(error);
  });

  app.redis = {};
  app.redis.client = client;
}
