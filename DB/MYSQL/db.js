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

// Primary Ids should be set by db !!!
const newRecord = (table, data, callback) => {
  let query;
  let values;
  if (table = 'listing') {
    query = `INSERT INTO ${table} (listingId, occupancy, feeeNightly, feeService, feeCleaning, rating, numRatings) VAlUES (?, ?, ?, ?, ?, ?, ?)`;
    values = [data.listingId, data.occupancy, data.feeeNightly, data.feeService, data.feeCleaning, data.rating, data.numRatings];
  }  else if (table = 'reservation') {
    query = `INSERT INTO ${type} (resId, listingKey, startDate, endDate, adults, children, infants) Values (?, ?, ?, ?, ?, ?, ?)`;
    values = [data.resId, data.listingKey, data.startDate, data.endDate, data.adults, data.children, data.infants];
  } else {
    console.error('Error type in newRecord');
    callback(404, null);
  }
  connection.query(query, values, (err, res) => {
    if (err) {
      console.error('Error in newRecord');
      callback(err, res);
    }
    callback(null, res);
  });
};

const newListing = (data, callback) => {
  let query = `INSERT INTO reservations (listingId, occupancy, feeeNightly, feeService, feeCleaning, rating, numRatings) VAlUES (?, ?, ?, ?, ?, ?, ?)`;
  let values = [data.listingId, data.occupancy, data.feeeNightly, data.feeService, data.feeCleaning, data.rating, data.numRatings];
  connection.query(query, values, (err, res) => {
    if (err) {
      console.error('Error in newListing');
      callback(err, res);
    }
    callback(null, res);
  });
};

// update

// delete
module.exports = {
  connection,
  getCostsByAppartment
};