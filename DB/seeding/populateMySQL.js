// create test data set with seed.js and poulate mySql with data

const mysql = require('mysql');
const moment = require('moment');
const fs = require('fs');
const csvSeed = require('./seed.js');
const db = require('../MYSQL/db.js');

// to speed up look into https://dev.mysql.com/doc/refman/8.0/en/optimizing-innodb-bulk-data-loading.html more

// Reads csv data into MySQL Database
let pipeData = () => {
  // https://www.youtube.com/watch?v=9_x-UIVlxgo&ab_channel=coder4life faster ??

  // open read file stream to csv files
  // listings
  //let listingReadStream = fs.createReadStream('../seeding/listingData.csv');
  db.query(
'LOAD DATA INLINE "../seeding/listingData.csv" \
INTO TABLE listings \
FIELDS TERMINATED BY "," \
LINES TERMINATED BY "/n" \
IGNORE 1 ROWS'
);
  console.log('listings seeded in mySQL');
  // reservations
  //let reservationReadStream = fs.createReadStream('/../seeding/reservationData.csv');

  // get mySQL ready for bulk loading for InnoDB Tables

  // read and write data to database

  // read and pipe to db

  // read csv files and pipe data to mysql db write stream
}



//load data local in file








//-------------------------------------------------------------------------------------
// main calls async

let main = async () => {
  // seed csv files function call
  await csvSeed(); //------------already seeded so commented out
  //await pipeData();
  //console.log('pipeData done');
  await db.end(); //disconect from mySQL
  console.log('Disconected from mySQL');
}

main();



