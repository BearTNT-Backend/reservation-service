const mysql = require('mysql');

let connection = mysql.createConnection ({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'sdc'
});

// Conncect to db
connection.connect((err) => {
  if (err) {
    throw err;
  } else {
    console.log('Connceted to mySQL Database!');
  }
});

module.exports = connection;