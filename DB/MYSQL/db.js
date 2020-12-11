const mysql = require('mysql');
const moment = require('moment');
const db = require('./login.js');

  // gets
  let getRecord = (table, element, id, callback) => {
    if (table = 'listings') {
      primaryId = 'listingId';
    }  else if (table = 'reservations') {
      primaryId = 'resId';
    } else {
      console.error('Error type in updateRecord');
      callback(404, null);
    }
    let query = `SELECT ${element} FROM ${table} WHERE ${primaryId} = ${id}`;
    db.query(query, (err, res) => {
      if (err) {
        console.error('Error in getCostsByAppartment');
        callback(err, res);
      }
      callback(null, res);
    });
  };

  // send only the days which are already reserved to client
  let getCalendarData = (id, callback) => {
    db.query(`SELECT * FROM listings WHERE listingId = ${id}`, (err, res) => {
      if (err) {
        return callback(err);
      }
      let listing = {}; // get rid of [ ] and RowDataPacket obj name
      for (i in res[0]) {
        listing[i] = res[0][i];
      };
      db.query(`SELECT * FROM reservations WHERE listingKey = ${id}`, (err, res) => {
        if (err) {
          return callback(err);
        }
        // make arr of all days that are not available, {date: date, available: bool}
        let reservedDays = [];
        reservedDays.push(listing);
        // console.log(listing);
        for (var i = 0; i < res.length; i++) {
          let s = moment(res[i].startDate);
          let e = moment(res[i].endDate);
          let lengthOfStay = e.diff(s, 'days');
          //console.log(res[i].startDate, ' - ', res[i].endDate, ' = ', lengthOfStay);
          for (var j = 0; j <= lengthOfStay; j++) {
            reservedDays.push({date: s.format('YYYY-MM-DD'), available: false});
            s.add(1, 'days');
          }
        }
        // console.log(reservedDays);
        return callback(null, reservedDays);
      });
    });
  };

  let getListingInfo = (id, callback) => {
    db.query(`SELECT * FROM listings WHERE listingId = ${id}`, (err, res) => {
      if (err) {
        return callback(err);
      }
      let listing = {}; // get rid of [ ] and RowDataPacket obj name
      for (i in res[0]) {
        listing[i] = res[0][i];
      };
      return callback(null, listing);
    });
  };

  // const getListing = (listingId, callback) => {
  //   let query = `SELECT * FROM listings WHERE listingId = ${listingId}`;

  // const getReservation = (resId, callback) => {
  //   let query = `SELECT * FROM reservations WHERE resId = ${resId}`;

  // const getAllResForListing = (listingKey, callback) => {
  //   let query = `SELECT * FROM reservations WHERE listingKey = ${listingKey}`;

  // posts

  // Primary Ids should be set by db !!!
  // data should = table, schema values minus primary id
  let newRecord = (data, callback) => {
    let query = '';
    let values = [];
    let table = data.table;
    if (table = 'listings') {
      query = `INSERT INTO ${table} (occupancy, feeNightly, feeService, feeCleaning, rating, numRatings) VAlUES (?, ?, ?, ?, ?, ?)`;
      values = [data.occupancy, data.feeeNightly, data.feeService, data.feeCleaning, data.rating, data.numRatings];
    }  else if (table = 'reservations') {
      query = `INSERT INTO ${type} (listingKey, startDate, endDate, adults, children, infants) Values (?, ?, ?, ?, ?, ?)`;
      values = [data.listingKey, data.startDate, data.endDate, data.adults, data.children, data.infants];
    } else {
      console.error('Error type in newRecord');
      callback(404, null);
    }
    db.query(query, values, (err, res) => {
      if (err) {
        console.error('Error in newRecord');
        callback(err, res);
      }
      callback(null, res);
    });
  };

  // update
  let updateRecord = (table, id, element, newValue, callback) => {
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
    db.query(query, (err, res) => {
      if (err) {
        console.error('Error in updateRecord', err);
        callback(err);
      }
      callback(null);
    });
  };

  // delete
  let removeRecord = (table, id, callback) => {
    let primaryId = '';
    if (table = 'listings') {
      // must remove children first i.e. reservations for listing
      db.query(`DELETE FROM reservations WHERE listingKey = ${id}`, (err) => {
        if (err) {
          console.error('Could not Remove reference records' , err);
          callback(400); // bad request
        }
      });
      primaryId = 'listingId';
    }  else if (table = 'reservations') {
      primaryId = 'resId';
    } else {
      console.error('Error type in removeRecord');
      callback(404);
    }
    let query = `DELETE FROM ${table} WHERE ${primaryId} = ${id}`;
    db.query(query, (err) => {
      if (err) {
        console.error('Error in removeRecord');
        callback(err);
      }
      callback(null);
    });
  };

module.exports.getRecord = getRecord;
module.exports.newRecord = newRecord;
module.exports.updateRecord = updateRecord;
module.exports.removeRecord = removeRecord;

module.exports.getCalendarData = getCalendarData;
module.exports.getListingInfo = getListingInfo;