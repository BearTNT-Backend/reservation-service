// seed fake data of 10,000,000 listings with 0-3 reservations per listing for a total of 10,000,000 - 40,000,000 records into two csv files
// npm run seedCSV

const moment = require('moment') ;
const MomentRandom = require('moment-random');
const fs = require('fs');


//const { Writeable } = require('stream');
// Helpers --------------------------------------------------------------------

// number of listings to be created
  //const numListings = 10000000;
const numListings = 10;

// get random numbers
let randomNum = (min, max) => {
  return (min + Math.floor(Math.random() * max));
};

// create reservation data ----------------------------------------------------
let createReservation = (occupancy, listingId) => {
    //resId = ???
  let adults = randomNum(1, occupancy);
  let children = randomNum(0, (occupancy - adults));
  // choose a random day
  let start = MomentRandom('2021-12-31', '2021-01-01').format('YYYY-MM-DD');
  let end = moment(start, 'YYYY-MM-DD').add(randomNum(1, 10), 'days').format('YYYY-MM-DD');

  let reservation = {
    listingKey: listingId,
    start: start,
    end: end,
    adults: adults,
    children: children,
    infants: randomNum(0, 2)
  };

  return reservation;
};

// --------------------------------------------------------------------------------
let createRecord = (id) => {
  //input id
  let listing = {};
  let reservations = [];
  //create a listing
  let feeNightly = randomNum(50, 300);
  let feeService = Math.floor(feeNightly * 0.15);
  let feeCleaning = Math.floor(feeNightly * 0.1);

  listing = { //reservationKey ???
    listingId: id,
    occupancy: randomNum(1, 10),
    feeNightly: feeNightly,
    feeService: feeService,
    feeCleaning: feeCleaning,
    rating: Number((Math.random() * 5).toFixed(2)), // 5 is exclusive :(
    numRatings: randomNum(0, 1000)
  }

  //reservations
  let numReservations = randomNum(1, 3);
  for (var j = 0; j < numReservations; j++) {
    reservations.push(createReservation(listing.occupancy, id));
  }

  let record = {listing: listing, reservations: reservations};
  return record;
  // console.log('In seeding script');
  // console.log('lisnting = ', listing);
  // console.log('reservations = ', reservation[0]);
};

//--------------------------------------------------------------------------------
// create records and write to csv file
// npm csv writer ?

let createWriteRecords = (listingWriteStream, reservationWriteStream, callback) => {
// https://nodejs.org/api/stream.html#stream_event_drain
  // set csv first line with data variable names
  listingWriteStream.write('listingId, occupancy, feeNightly, feeService, feeCleaning, rating, numRatings\n');
  reservationWriteStream.write('resId, listingKey, start, end, adults, children, infants\n');

  let numberOfReservations = 0;
  let i = 0;
  let goodWriteListing = true;
  let goodWriteRes = true;

  let write = () => {
    do {
      i++;
      //console.log(i);

      // running status
      if (i % 500000 === 0) {
        console.log('Completed ', i, ' primary records ...');
      }

      // get data
      let record = createRecord(i);

      // format data // do via a loop to reduce updates ...

      let listingRecord = `${record.listing.listingId}, ${record.listing.occupancy}, ${record.listing.feeNightly}, \
${record.listing.feeService}, ${record.listing.feeCleaning}, \
${record.listing.rating}, ${record.listing.numRatings}\n`;


      let reservationRecord = '';
      for (var j = 0; j < record.reservations.length; j++) {
        reservationRecord += `${numberOfReservations}, ${record.reservations[j].listingKey}, ${record.reservations[j].start}, \
${record.reservations[j].end}, ${record.reservations[j].adults}, ${record.reservations[j].children}, \
${record.reservations[j].infants}\n`;
          numberOfReservations++;
      }

      // write to file and drain if bad write
      if (i === numListings) {
        // last write
        console.log('LAST WRITE!!!!!');
        listingWriteStream.write(`${listingRecord}`, () => {
          reservationWriteStream.write(`${reservationRecord}`, callback);
        });
      } else {
        //write data
        goodWriteListing = listingWriteStream.write(`${listingRecord}`);
        goodWriteRes = reservationWriteStream.write(`${reservationRecord}`);
      }
    } while (i < numListings && goodWriteListing && goodWriteRes);

    if (i < numListings) { // failed to write
      if(!goodWriteListing) {
        // console.log('Drain listings ', i);
        listingWriteStream.once('drain', write);
      }
      if (!goodWriteRes) {
        // console.log('Drain reservations ', i, goodWriteListing, goodWriteRes);
        reservationWriteStream.once('drain', write);
      }
    }
  }

  write();
};

// main calls -----------------------------------------------------------------

let main = () => {
  // create write streams
  let listingWriteStream = fs.createWriteStream(__dirname + '/listingData.csv');
  let reservationWriteStream = fs.createWriteStream(__dirname + '/reservationData.csv');

  // create and write data
  console.log(`Creating ${numListings} primary records ...`);
  createWriteRecords(listingWriteStream, reservationWriteStream, () => {
    //console.log('Writes complete. Closing files ...');
    // close files
    listingWriteStream.end();
    reservationWriteStream.end();
    console.log('CSV Seed Complete!');
  });

}

main();

module.exports = main;