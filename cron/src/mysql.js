const mysql = require('mysql');
const {
  MYSQL_DB_HOST,
  MYSQL_DB_PORT,
  MYSQL_DB_USER,
  MYSQL_DB_PASSWORD,
  MYSQL_DB_NAME,
} = process.env;

module.exports = (cb) => {
  const pool = mysql.createPool({
    connectionLimit : 20,
    host: MYSQL_DB_HOST,
    port: MYSQL_DB_PORT,
    user: MYSQL_DB_USER,
    password: MYSQL_DB_PASSWORD,
    database: MYSQL_DB_NAME,
  });

  pool.getConnection(function(err, connection) {
    if (err) throw err;

    cb(connection);
  });
}
