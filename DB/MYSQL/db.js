const mysql = require('mysql');
const connection = require('./login.js');

// Conncect to db
connection.connect((err) => {
  if (err) {
    throw err;
  } else {
    console.log('Connceted to mySQL Database!');
  }
});

module.exports = connection;