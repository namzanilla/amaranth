const {promisify} = require('util');

const serviceHelper = {
  getCategories: {
    prepareResults: (results) => {
      for (const result of results) {
        const {parent} = result;

        if (null === parent) {
          delete result.parent;
        }
      }
    },
    getLanguageId: (query, DEFAULT_LANGUAGE_ID) => {
      let {
        language_id: languageId,
      } = query;

      languageId = parseInt(languageId);

      return isNaN(languageId) ? DEFAULT_LANGUAGE_ID : languageId;
    },
    getView: (query) => {
      let {
        view = '1',
      } = query;

      view = parseInt(view);

      if (isNaN(view)) {
        return 1;
      } else if (2 === view) {
        return 2;
      }

      return 1;
    },
    prepareResultsByView: (results, view) => {
      if (2 === view) {
        const id2index = {};

        for (let index = 0; index < results.length; index++) {
          const {
            [index]: result,
          } = results;
          const {id} = result;

          id2index[id] = index;
        }

        for (let index = 0; index < results.length; index++) {
          const {
            [index]: result,
          } = results;
          const {parent} = result;

          if (parent !== undefined) {
            const {
              [parent]: parentIndex,
            } = id2index;

            if (parentIndex !== undefined) {
              results[id2index[parent]].child = results[id2index[parent]].child === undefined
                ? []
                : results[id2index[parent]].child;

              results[id2index[parent]].child.push(results[index]);
            }
          }
        }

        results = results.filter((el) => el.parent === undefined);
      }

      return results;
    },
    getRedisCacheKey: (languageId, view) => {
      return `api/v1/category?language_id=${languageId}&view=${view}`;
    },
    getCache: (query) => {
      let {
        cache = '1',
      } = query;

      cache = parseInt(cache);

      if (isNaN(cache)) {
        return 1;
      } else if (0 === cache) {
        return 0;
      }

      return 1;
    },
  },
};

module.exports = (app) => {
  const {DEFAULT_LANGUAGE_ID} = require('./language.service')(app);
  const getAsync = promisify(app.redis.client.get).bind(app.redis.client);

  const getCategories = async (params, query) => {
    const {
      id: categoryId,
    } = params;

    const languageId = serviceHelper.getCategories.getLanguageId(query, DEFAULT_LANGUAGE_ID);
    const view = serviceHelper.getCategories.getView(query);
    const cache = serviceHelper.getCategories.getCache(query);
    const redisCacheKey = serviceHelper.getCategories.getRedisCacheKey(languageId, view);

    if (1 === cache) {
      const categories = await getAsync(redisCacheKey);

      if (categories !== null) {
        return JSON.parse(categories);
      }
    }

    const qs = `
        SELECT
          c.id,
          c.parent,
          ct.name
        FROM category c
        INNER JOIN category_trans ct
        ON c.id = ct.category_id
        WHERE ct.language_id=?
        AND c.status=1
        ORDER BY c.order
    `;

    return new Promise((resolve, reject) => {
      app.mysql.connection.query(qs, [languageId], async (error, results) => {
        if (error) {
          reject(error);
        }

        if (results.length > 0) {
          serviceHelper.getCategories.prepareResults(results);

          if (2 === view) {
            results = serviceHelper.getCategories.prepareResultsByView(results, view);
          }

          app.redis.client.set(redisCacheKey, JSON.stringify(results), 'EX', 60 * 60);
        }

        resolve(results);
      });
    });
  }

  return {
    getCategories,
  };
};

