const redisHelper = require('./../helpers/redis');
const statusConst = require('./../const/status');

module.exports = (app) => {
  const {getAmountByInfo} = require('./../services/cart.service')(app);

  const createOrder = async (token, data) => {
    const response = {
      error: true,
    };

    try {
      const cartKey = redisHelper.getRedisCartKey(token);
      const info = await redisHelper.getCartInfo(cartKey, app);

      if (info === null || !Object.keys(info).length) {
        response.message = 'Empty cart';

        return response;
      }

      const amount = await getAmountByInfo(info);
      const {
        contactInfo: {
          contactName = '',
          contactPhone = '',
          contactCity = '',
          contactEmail = '',
        } = {},
      } = data;

      if (!contactPhone) {
        response.message = 'Invalid contact phone number';

        return response;
      }

      const orderId = await new Promise((resolve, reject) => {
        const connection = app.mysql.connection;
        connection.beginTransaction((err) => {
          if (err) {
            throw err;
          }

          const qs = `
            INSERT INTO \`order\` (
              status_id,
              contactName,
              contactPhone,
              contactCity,
              contactEmail,
              amount
            ) VALUES (?, ?, ?, ?, ?, ?)
          `;

          const qsParams = [];
          qsParams.push(statusConst.CREATED);
          qsParams.push(contactName);
          qsParams.push(contactPhone);
          qsParams.push(contactCity);
          qsParams.push(contactEmail);
          qsParams.push(amount);

          connection.query(qs, qsParams, (error, results) => {
            if (error) {
              return connection.rollback(() => {
                reject(error);
              });
            }

            const orderId = results.insertId;

            let qs = 'INSERT INTO order_detail VALUES ';
            const values = [];

            for (const productId in info) {
              const count = info[productId];
              values.push(`(${orderId}, ${productId}, ${count})`)
            }

            qs += values.join(',');

            connection.query(qs, qsParams, (error) => {
              if (error) {
                return connection.rollback(() => {
                  reject(error);
                });
              }

              connection.commit((error) => {
                if (error) {
                  return connection.rollback(() => {
                    reject(error);
                  });
                }

                redisHelper.delCartInfo(app, cartKey);
                resolve(orderId);
              });
            });
          });
        });
      });

      response.error = false;
      response.orderId = orderId;
      response.amount = amount;

      return response;
    } catch(e) {
      console.log(e);

      return response;
    }
  };

  return {
    createOrder,
  };
}
