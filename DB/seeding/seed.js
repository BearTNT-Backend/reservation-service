// seed fake data of 10,000,000 listings with 0-3 reservations per listing for a total of 10,000,000 - 40,000,000 records

const moment = require('moment') ;
const MomentRandom = require('moment-random');

// number of listings to be created
const numListings = 1;
console.log(`Creating ${numListings} listings`);
// get random numbers
let randomNum = (min, max) => {
  return (min + Math.floor(Math.random() * max));
};

// get random dates - date format i.e. YYYY-MM-DD
// create reservation data ----------------------------------------------------
let createReservation = (occupency, listingId) => {
    //resId = ???
  let adults = randomNum(1, occupency);
  let children = randomNum(0, (occupency - adults));
  // choose a random day
  let start = MomentRandom('2021-12-31', '2021-01-01').format('YYYY-MM-DD');
  let end = moment(start, 'YYYY-MM-DD').add('days', randomNum(1, 10)).format('YYYY-MM-DD'); // ???

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
let main = () => {

  let listing = {};
  let reservation = [];
  for (var i = 0; i < numListings; i++) {
    //create a listing
    let feeNightly = randomNum(50, 300);
    let feeService = Math.floor(feeNightly * 0.15);
    let feeCleaning = Math.floor(feeNightly * 0.1);

    listing = { //reservationKey ???
      listingId: i,
      occupency: randomNum(1, 10),
      feeNightly: feeNightly,
      feeService: feeService,
      feeCleaning: feeCleaning,
      rating: Number((Math.random() * 5).toFixed(2)), // 5 is exclusive :(
      numRatings: randomNum(0, 1000)
    }

    //reservations
    let numReservations = randomNum(1, 3);
    for (var j = 0; j < numReservations; j++) {
      reservation.push(createReservation(listing.occupency, i));
    }


  }
    console.log('In seeding script');
    console.log('lisnting = ', listing);
    console.log('reservations = ', reservation[0]);
};

main();
