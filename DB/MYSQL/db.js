const mysql = require('mysql');
import connection from ('./login.js');

const dbName = 'sdc';

// Create and/or conncect to db
connection.connect((err) => {
  if (err) {
    throw err;
  } else {
    console.log('Connected to mySQL');
    connection.query(`CREATE DATABASE IF NOT EXISTS ${dbName}`, (err, res) => {
      if (err) {
        throw err;
      } else {
        db.connect(`USE ${dbName}`, (err, res) => {
          if (err) {
            throw err;
          } else {
            console.log(`Using ${dbName}`);
          }
        });
      }
    });
  }
});