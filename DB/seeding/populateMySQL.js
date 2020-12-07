// read csv data into mySQL database tables
// sudo service mysql start
// may need mysql> SET GLOBAL local_infile=1;

const mysql = require('mysql');
const fs = require('fs');
const db = require('../MYSQL/db.js');

// to speed up look into https://dev.mysql.com/doc/refman/8.0/en/optimizing-innodb-bulk-data-loading.html more
// https://www.youtube.com/watch?v=9_x-UIVlxgo&ab_channel=coder4life faster ??

let pipeListings = () => {

  console.log('Seeding listings...');

  db.query(
'LOAD DATA LOCAL INFILE "/home/dylan/Desktop/SDC/Reservation-Service/DB/seeding/listingData.csv" \
INTO TABLE listings \
FIELDS TERMINATED BY "," \
LINES TERMINATED BY "\n" \
IGNORE 1 ROWS'
  );

};

let pipeReservations = () => {

  console.log('Seeding reservations...');

  db.query(
'LOAD DATA LOCAL INFILE "/home/dylan/Desktop/SDC/Reservation-Service/DB/seeding/reservationData.csv" \
INTO TABLE reservations \
FIELDS TERMINATED BY "," \
LINES TERMINATED BY "\n" \
IGNORE 1 ROWS'
  );

};

//-------------------------------------------------------------------------------------
// main calls async

let main = async () => {
  console.log('Seeding mySQL ...');
  await pipeListings();
  console.log('listings table seeded!');
  await pipeReservations();
  console.log('Reservations table seeded');
  await db.end(); //disconect from mySQL
  console.log('mySQL seeding Complete!');
}

main();

module.exports = main;

// npm run seedMysql