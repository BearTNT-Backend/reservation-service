// read csv data into mySQL database tables
// sudo service mysql start
// may need mysql> SET GLOBAL local_infile=1;
// npm run seedMysql

const mysql = require('mysql');
const fs = require('fs');
const db = require('../MYSQL/login.js');

// to speed up look into https://dev.mysql.com/doc/refman/8.0/en/optimizing-innodb-bulk-data-loading.html more
// https://www.youtube.com/watch?v=9_x-UIVlxgo&ab_channel=coder4life faster ??

let pipeListings = (callback) => {

  console.log('  Seeding listings...');

  db.query(
'LOAD DATA LOCAL INFILE "/home/dylan/Desktop/SDC/Reservation-Service/DB/seeding/listingData.csv" \
INTO TABLE listings \
FIELDS TERMINATED BY "," \
LINES TERMINATED BY "\n" \
IGNORE 1 ROWS', callback
  );

};

let pipeReservations = (callback) => {

  console.log('  Seeding reservations...');

  db.query(
'LOAD DATA LOCAL INFILE "/home/dylan/Desktop/SDC/Reservation-Service/DB/seeding/reservationData.csv" \
INTO TABLE reservations \
FIELDS TERMINATED BY "," \
LINES TERMINATED BY "\n" \
IGNORE 1 ROWS', callback
  );

};

//-------------------------------------------------------------------------------------
// main calls async

let main = () => {
  console.log('Seeding mySQL ...');
  pipeListings( () => {
    console.log('listings table seeded!');
    pipeReservations( () => {
      console.log('Reservations table seeded');
      db.end( () => {
        console.log('mySQL seeding Complete!');
      });
    });
  });
};

main();

module.exports = main;
