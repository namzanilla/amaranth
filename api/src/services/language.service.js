const {promisify} = require('util');
const DEFAULT_LANGUAGE_ID = 1;

module.exports = (app) => {
  const getAsync = promisify(app.redis.client.get).bind(app.redis.client);
  const setAsync = promisify(app.redis.client.set).bind(app.redis.client);
  const getLanguages = async () => {
    const redisCacheKey = 'api/v1/language';
    const languages = await getAsync(redisCacheKey);

    if (null !== languages) {
      return JSON.parse(languages);
    }

    const qs = 'SELECT * FROM language';

    return new Promise((resolve, reject) => {
      app.mysql.connection.query(qs, async (error, results) => {
        if (error) {
          reject(error);
        }

        setAsync(redisCacheKey, JSON.stringify(results), 'EX', 60 * 60);

        resolve(results);
      });
    });
  }

  return {
    getLanguages,
    DEFAULT_LANGUAGE_ID,
  };
};

