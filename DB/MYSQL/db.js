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


// gets

const getCostsByAppartment = (listingId, callback) => {
  let query = `SELECT feeNightly FROM listings WHERE listingId = ${listingId}`;
  connection.query(query, (err, res) => {
    if (err) {
      console.error('Error in getCostsByAppartment');
      callback(err, res);
    }
    callback(null, res);
  });
};

const getListing = (listingId, callback) => {
  let query = `SELECT * FROM listings WHERE listingId = ${listingId}`;
  connection.query(query, (err, res) => {
    if (err) {
      console.error('Error in getListing');
      callback(err, res);
    }
    callback(null, res);
  });
};

const getReservation = (resId, callback) => {
  let query = `SELECT * FROM reservations WHERE resId = ${resId}`;
  connection.query(query, (err, res) => {
    if (err) {
      console.error('Error in getReservation');
      callback(err, res);
    }
    callback(null, res);
  });
};

const getAllResForListing = (listingKey, callback) => {
  let query = `SELECT * FROM reservations WHERE listingKey = ${listingKey}`;
  connection.query(query, (err, res) => {
    if (err) {
      console.error('Error in getAllResForListing');
      callback(err, res);
    }
    callback(null, res);
  });
};

// posts


// update

// delete
module.exports = {
  connection,
  getCostsByAppartment
};