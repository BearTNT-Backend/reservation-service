const mysql = require('mysql');

let connection = mysql.createConnection ({
  host: '34.221.127.149',
  user: 'dylan',
  password: 'dylanR2020!',
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