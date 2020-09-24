const {promisify} = require('util');
const querystring = require('querystring');

module.exports = (app) => {
  const {DEFAULT_LANGUAGE_ID} = require('./language.service')(app);
  const getAsync = promisify(app.redis.client.get).bind(app.redis.client);
  const sh = serviceHelper();

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

    qs.languageId = sh.qs.getLanguageId(query, DEFAULT_LANGUAGE_ID);
    qs.group = sh.qs.getGroup(query);
    qs.view = sh.qs.getView(query);
    qs.cache = sh.qs.getCache(query);

    const redisCacheKey = sh.getRedisCacheKey(qs);

    if (1 === qs.cache) {
      const categories = await getAsync(redisCacheKey);

      if (categories !== null) {
        return JSON.parse(categories);
      }
    }

    let sql = `
        SELECT
          c.id,
          c.parent,
          c.name
        FROM category c
        WHERE c.status=1
    `;

    const sqlValues = [];

    if (null !== qs.group) {
      sql += ' AND c.`group`=?';
      sqlValues.push(qs.group);
    }

    let list = await new Promise((resolve, reject) => {
      app.mysql.connection.query(sql, sqlValues, async (error, results) => {
        if (error) {
          reject(error);
        }

        resolve(results);
      });
    });

    if (!list.length) return list;

    const id2ix = {};

    list.forEach(({id}, index) => {
      id2ix[id] = index;
    });

    sql = `SELECT
        ct.category_id,
        ct.name
      FROM category_trans ct
      WHERE ct.language_id=?
      AND ct.category_id IN (${Object.keys(id2ix).join(',')})`;

    const trans = await new Promise((resolve, reject) => {
      app.mysql.connection.query(sql, qs.languageId, async (error, results) => {
        if (error) {
          reject(error);
        }

        resolve(results);
      });
    });

    if (!trans.length) return list;

    list.forEach((listEl) => {
      const {id, parent} = listEl;
      const {
        [id]: index,
      } = id2ix;

      if (0 === parent) {
        delete listEl.parent;
      }

      if (undefined !== index) {
        const {
          [index]: {
            name,
          } = {},
        } = trans;

        if (name) listEl.name = name;
      }
    })

    if (2 === qs.view) {
      list = sh.prepareResultsByView(list, qs.view);
    }

    app.redis.client.set(redisCacheKey, JSON.stringify(list), 'EX', 60 * 60);

    return list;
  }

  return {
    getList,
    getById,
  };
};

function serviceHelper() {
  return {
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
      qs = querystring.stringify(qs);

      if (qs) {
        qs = `?${qs}`;
      }

      return `api/v1/category${qs}`;
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
      getGroup: (query) => {
        let {group} = query;
        group = parseInt(group);

        return isNaN(group) ? null : group;
      },
    },
  };
}
