const mysql = require('mysql')

module.exports = (cb) => {
  const pool = mysql.createPool({
    connectionLimit : 20,
    host: process.env.MYSQL_DB_HOST,
    port: process.env.MYSQL_DB_PORT,
    user: process.env.MYSQL_DB_USER,
    password: process.env.MYSQL_DB_PASSWORD,
    database: process.env.MYSQL_DB_NAME,
  })

  pool.getConnection(function(err, connection) {
    if (err) throw err;

    cb(connection);
  })
}
