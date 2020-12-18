const relic = require('newrelic');
const express = require('express');
let app = express();
app.use(express.static(__dirname + '/../client/dist'));
const bodyParser = require('body-parser');
//app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
const path = require('path');


// --- MongoDB --- not CRUD
// let db = require('../DB/MongoDB/db.js');
// let data = require('../DB/MongoDB/data.js');

// --- mySQL ---
const db = require('../DB/MYSQL/db.js');


// --- Cassandra ---
// ...


app.get('/listing/*', (req, res) => {


  res.sendFile (path.join(__dirname, '../client/dist/index.html'));

});

app.get('/api/listing', (req, res) => {
  //console.log(req.query.appartmentID);
  let listingId = req.query.listingId;
  db.getListingInfo(listingId, (err, data) => {
    if (err) {
      res.sendStatus(400);
    } else {
      res.status(201).json(data);
    }
  });
});

app.get('/api/reservation/calendar', (req, res) => {
  //console.log(req.query.appartmentID);
  let listingId = req.query.ApartmentId;
  db.getCalendarData(listingId, (err, data) => {
    if (err) {
      res.sendStatus(400);
    } else {
      res.status(201).json(data);
    }
  });
});
/*
// app.get('/api/reservation/reservationCost', (req, res) => {
//   let listingId = Number(req.query.listingId);
//   db.getCostsByAppartment(listingId, (err, data) => {
//     if (err) {
//       console.log(listingId);
//       res.sendStatus(400);
//     } else {
//       //console.log('Reservation listingId', data);
//       //console.log('Reservation data', data);
//       res.status(201).json(data);
//     }
//   });
// });
*/

// body input table name, element searching for and primary id
app.get('/api/getRecord', (req, res) => {
  // console.log(req.body);
    let table = req.body.table;
    let element = req.body.element;
    let id = req.boqy.query.ApartmentId;
    db.getRecord(table, element, id, (err, data) => {
      if (err) {
        console.error(err);
        res.sendStatus(404);
      } else {
        res.status(201).json(data);
      }
    });
  });



// post
app.post('/api/newRecord', (req, res) => { // validity should be checked on client just need to push to db
  db.newRecord (req.body, (err) => {
    if (err) {
      console.log('error during saving new record', err);
      res.status(400).send();
    } else {
      console.log('post completed');
      res.status(201).send('Post Completed');
    }
  });
});

// update
app.put('/api/update', (req, res) => {
  let table = req.body.table;
  let element = req.body.element;
  let id = req.query.ApartmentId;
  let newValue = req.body.newValue;
  // valid data point ?? db.find()
  db.updateRecord(table, id, element, newValue, (err) => {
    if (err) {
      res.send('Could not update Reservation');
    } else {
      res.send('Reservation updated');
    }
  });
});

// delete
// input table name, record id
app.delete('/api/delete', (req, res) => {
  db.removeRecord(req.body.table, req.body.id, (err) => {
    if (err) {
      console.log('Error could not delete', err);
      res.send('Error could not delete');
    } else {
      console.log('Deleted Record');
      res.send('Deleted Record');
    }
  });
});

let port = process.env.PORT || 3001;
app.listen(port, ()=> {
  console.log('listening on port', port);
});
