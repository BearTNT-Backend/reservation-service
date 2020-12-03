const express = require('express');
let app = express();
app.use(express.static(__dirname + '/../client/dist'));
const bodyParser = require('body-parser');
//app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
const path = require('path');
let db = require('../DB/db.js');
let data = require('../DB/data.js');

app.get('/listing/*', (req, res) => {


  res.sendFile (path.join(__dirname, '../client/dist/index.html'));

});

app.get('/api/reservation/calendar', (req, res) => {
  //console.log(req.query.appartmentID);
  let appartmentID = req.query.ApartmentId;

  db.getCalendarDataByApartment(appartmentID, (err, data) => {
    if (err) {
      res.sendStatus(400);
    } else {
      //console.log(data);
      res.status(201).json(data);
    }
  });
});

app.get('/api/reservation/reservationCost', (req, res) => {
  let appartmentID = (Number) (req.query.appartmentID);
  db.getCostsByAppartment(appartmentID, (err, data) => {
    if (err) {
      console.log(appartmentID);
      res.sendStatus(400);
    } else {
      //console.log('Reservation appartmentID', data);
      //console.log('Reservation data', data);
      res.status(201).json(data);
    }
  });
});


// -------------start of SDC ----------------

app.post('/api/reservation/makeReservation', (req, res) => { // validity should be checked on client just need to push to db
  console.log('makeReservation');
  //console.log(req.body);
  let params = req.body.params;
  db.makeReservation (params, (err) => {
    if (err) {
      console.log('error during saving reservation data');
      res.sendStatus(400);
    } else {
      console.log('post complete');
      res.sendStatus(201);
    }
  });
});


// update
app.put('/api/reservation/update', (req, res) => {
  console.log('reservation update!');
  console.log(req);
  // let appartmentID = (Number) (req.body.appartmentID);
  // valid data point  db.find()

  // check valid upadte

  res.send('do something with reservation update');
});
// delete
app.delete('/api/reservation/delete', (req, res) => {
  console.log('Deleting Reservation!');
  let aptId = Number(req.query.ApartmentId);
  let resId = req.body._id;
  db.deleteReservation({appartmentID: aptId, _id: resId}, (err) => {
    if (err) {
      console.log('Error could not delete');
      res.send('Error could not delete');
    } else {
      console.log('Deleted Reservation');
      res.send('Deleted Reservation');
    }
  });
});



let port = process.env.PORT || 3001;
app.listen(port, ()=> {
  console.log('listening on port', port);
});