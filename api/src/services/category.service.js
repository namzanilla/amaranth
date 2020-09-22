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
    getRedisCacheKey: (qs) => {
      const {
        languageId,
        view,
      } = qs;

      return `api/v1/category?language_id=${languageId}&view=${view}`;
    },
    qs: {
      getLanguageId: (query, DEFAULT_LANGUAGE_ID) => {
        let {
          language_id: languageId,
        } = query;

        languageId = parseInt(languageId);

        return isNaN(languageId) ? DEFAULT_LANGUAGE_ID : languageId;
      },
      getCache: (query) => {
        let {
          cache = '1',
        } = query;

        cache = parseInt(cache);

        if (isNaN(cache) || 1 === cache) {
          return 1;
        }

        return 0;
      },
      getView: (query) => {
        let {
          view = '1',
        } = query;

        view = parseInt(view);

        if (isNaN(view) || view === 1) {
          return 1;
        }

        return 2;
      },
    },
  },
};

module.exports = (app) => {
  const {DEFAULT_LANGUAGE_ID} = require('./language.service')(app);
  const getAsync = promisify(app.redis.client.get).bind(app.redis.client);

  const getById = (categoryId) => {
    const sql = `
        SELECT
          c.id,
          c.name
        FROM category c
        WHERE c.id=?
    `;

    return new Promise((resolve, reject) => {
      app.mysql.connection.query(sql, [categoryId], async (error, results) => {
        if (error) {
          reject(error);
        }

        const {
          [0]: result = {},
        } = results;

        resolve(result);
      });
    });
  }

  const getList = async (query) => {
    const qs = {};

    qs.languageId = serviceHelper.getCategories.qs.getLanguageId(query, DEFAULT_LANGUAGE_ID);
    qs.view = serviceHelper.getCategories.qs.getView(query);
    qs.cache = serviceHelper.getCategories.qs.getCache(query);

    const redisCacheKey = serviceHelper.getCategories.getRedisCacheKey(qs);

    if (1 === qs.cache) {
      const categories = await getAsync(redisCacheKey);

      if (categories !== null) {
        return JSON.parse(categories);
      }
    }

    const sql = `
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
      app.mysql.connection.query(sql, [qs.languageId], async (error, results) => {
        if (error) {
          reject(error);
        }

        if (results.length > 0) {
          serviceHelper.getCategories.prepareResults(results);

          if (2 === qs.view) {
            results = serviceHelper.getCategories.prepareResultsByView(results, qs.view);
          }

          app.redis.client.set(redisCacheKey, JSON.stringify(results), 'EX', 60 * 60);
        }

        resolve(results);
      });
    });
  }

  return {
    getList,
    getById,
  };
};

