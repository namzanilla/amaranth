const {promisify} = require('util');
const querystring = require('querystring');

module.exports = (app) => {
  const getAsync = promisify(app.redis.client.get).bind(app.redis.client);
  const sh = serviceHelper();

  const getById = async (params) => {
    let {
      categoryId,
      languageId,
    } = params;

    categoryId = parseInt(categoryId);

    const category = await new Promise((resolve, reject) => {
      const qs = `
        SELECT
          c.id,
          c.name
        FROM category c
        WHERE c.id=?
      `;
      const cb = async (error, results) => {
        if (error) {
          reject(error);
        }

        const {
          [0]: result = {},
        } = results;

        resolve(result);
      }

      app.mysql.connection.query(qs, categoryId, cb);
    });

    if (!Object.keys(category).length) {
      return category;
    }

    languageId = parseInt(languageId);
    if (languageId) {
      const name = await new Promise((resolve, reject) => {
        const qs = `
          SELECT ct.name
          FROM category_trans ct
          WHERE ct.category_id = ?
            AND ct.language_id = ?
        `;
        const params = [categoryId, languageId];
        const cb = async (error, results) => {
          if (error) {
            reject(error);
          }

          const {
            [0]: {
              name,
            } = {},
          } = results;

          resolve(name);
        };

        app.mysql.connection.query(qs, params, cb);
      });

      if (name) {
        category.name = name;
      }
    }
    
    return category;
  }

  const getList = async (query) => {
    const qs = {};

    qs.languageId = sh.qs.getLanguageId(query);
    qs.group = sh.qs.getGroup(query);
    qs.view = sh.qs.getView(query);
    qs.cache = sh.qs.getCache(query);
    qs.status = sh.qs.getStatus(query);
    qs.sort = sh.qs.getSort(query);

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
        WHERE 1=1
    `;

    const params = [];

    if (undefined !== qs.status) {
      sql += ' AND c.status=?';
      params.push(qs.status);
    }

    if (null !== qs.group) {
      sql += ' AND c.`group`=?';
      params.push(qs.group);
    }

    if (1 === qs.sort) {
      sql += ' ORDER BY c.`name`';
    }

    let list = await new Promise((resolve, reject) => {
      app.mysql.connection.query(sql, params, (error, results) => {
        if (error) {
          reject(error);
        }

        resolve(results);
      });
    });

    if (!list.length) return list;

    if (undefined !== qs.languageId) {
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
        const {id} = listEl;
        const {
          [id]: index,
        } = id2ix;

        if (undefined !== index) {
          const {
            [index]: {
              name,
            } = {},
          } = trans;

          if (name) listEl.name = name;
        }
      })
    }

    const deleteParentProp = (list) => {
      list.forEach((el) => {
        delete el.parent;
        const {child} = el;

        if (undefined !== child) {
          deleteParentProp(child);
        }
      })
    };

    if (2 === qs.view) {
      sh.prepareResultsByView(list, qs.view);
      list = list.filter((el) => el.parent === 0);
      deleteParentProp(list);
    }

    if (qs.cache === 1) {
      app.redis.client.set(redisCacheKey, JSON.stringify(list), 'EX', 60 * 60);
    }

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
            [index]: result = {},
          } = results;
          const {parent} = result;

          if (parent !== 0) {
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
      }
    },
    getRedisCacheKey: (qs) => {
      qs = querystring.stringify(qs);

      if (qs) {
        qs = `?${qs}`;
      }

      return `v1/category${qs}`;
    },
    qs: {
      getLanguageId: (query) => {
        let {
          language_id: languageId,
        } = query;

        if (!languageId) {
          return undefined;
        }

        languageId = parseInt(languageId);

        return isNaN(languageId) ? undefined : languageId;
      },
      getStatus: (query) => {
        let {
          status,
        } = query;

        if (undefined !== status) {
          status = parseInt(status);

          return isNaN(status) ? undefined : status;
        }

        return status;
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
      getSort: (query) => {
        let {sort} = query;
        sort = parseInt(sort);

        return isNaN(sort) ? null : sort;
      },
    },
  };
}
