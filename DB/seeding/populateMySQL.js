// create test data set with seed.js and poulate mySql with data
// may need mysql> SET GLOBAL local_infile=1;

const mysql = require('mysql');
const moment = require('moment');
const fs = require('fs');
const csvSeed = require('./seed.js');
const db = require('../MYSQL/db.js');

// to speed up look into https://dev.mysql.com/doc/refman/8.0/en/optimizing-innodb-bulk-data-loading.html more

// Reads csv data into MySQL Database
let pipeListings = () => {
  // https://www.youtube.com/watch?v=9_x-UIVlxgo&ab_channel=coder4life faster ??

  console.log('Seeding listings...');

  db.query(
'LOAD DATA LOCAL INFILE "/home/dylan/Desktop/SDC/Reservation-Service/DB/seeding/listingData.csv" \
INTO TABLE listings \
FIELDS TERMINATED BY "," \
LINES TERMINATED BY "\n"'
);

};

//listingId, occupency, feeNightly, feeService, feeCleaning, rating, numRatings
// \
// IGNORE 1 ROWS'


let pipeReservations = () => {

  console.log('Seeding reservations...');
  // reservations
//   db.query(
// 'LOAD DATA LOCAL INFILE "/home/dylan/Desktop/SDC/Reservation-Service/DB/seeding/reservationData.csv" \
// INTO TABLE reservations \
// FIELDS TERMINATED BY "," \
// LINES TERMINATED BY "\n" \
// IGNORE 1 ROWS'
//   );
//   console.log('reservations seeded in mySQL!');

  // get mySQL ready for bulk loading for InnoDB Tables
};

//-------------------------------------------------------------------------------------
// main calls async

let main = async () => {
  // seed csv files function call
  //await csvSeed(); //------------already seeded so commented out
  console.log('Seeding mySQL ...');
  await pipeListings();
  console.log('listings table seeded!');
  // await pipeReservations();
  // console.log('Reservations table seeded');
  await db.end(); //disconect from mySQL
  console.log('mySQL seeding Complete!');
}

main();



