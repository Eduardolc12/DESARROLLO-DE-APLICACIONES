const mysql = require('mysql2/promise');

// create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: process.env.DBUSER,
  password: process.env.DBPASS,
  database: 'im_hungry'
});

module.exports = connection