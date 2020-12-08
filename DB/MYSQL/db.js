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
  if (table = 'listings') {
    query = `INSERT INTO ${table} (listingId, occupancy, feeeNightly, feeService, feeCleaning, rating, numRatings) VAlUES (?, ?, ?, ?, ?, ?, ?)`;
    values = [data.listingId, data.occupancy, data.feeeNightly, data.feeService, data.feeCleaning, data.rating, data.numRatings];
  }  else if (table = 'reservations') {
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

// update
const updateRecord = (table, id, element, newValue, callback) => {
  let primaryId;
  if (table = 'listings') {
    primaryId = 'listingId';
  }  else if (table = 'reservations') {
    primaryId = 'resId';
  } else {
    console.error('Error type in updateRecord');
    callback(404, null);
  }
  let query = `UPDATE ${table} SET ${element} = ${newValue} WHERE ${primaryId} = ${id}`;
  connection.query(query, (err, res) => {
    if (err) {
      console.error('Error in updateRecord');
      callback(err, res);
    }
    callback(null, res);
  });
};

// delete
const removeRecord = (table, id, callback) => {
  let primaryId;
  if (table = 'listings') {
    primaryId = 'listingId';
  }  else if (table = 'reservations') {
    primaryId = 'resId';
  } else {
    console.error('Error type in removeRecord');
    callback(404, null);
  }
  let query = `DELETE FROM ${table} WHERE ${primaryId} = ${id}`;
  connection.query(query, (err, res) => {
    if (err) {
      console.error('Error in removeRecord');
      callback(err, res);
    }
    callback(null, res);
  });
};

module.exports = {
  connection,
  getCostsByAppartment
};