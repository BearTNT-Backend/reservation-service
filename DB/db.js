const mongoose = require('mongoose');
const dates = require ('./data.js');
const mongodbURL = process.env.MONGODB_URL || 'mongodb://localhost:27017/bear';
mongoose.connect(mongodbURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));



let ApartmentCalendar = mongoose.Schema ({
  apartmentId: Number,
  commonID: Number,
  CalendarDays: {
    date: Date,
    available: Boolean,
    totalGuests: Number,
    apartmentCost: Number,
    cleaningCost: Number,
    serviceCost: Number,
    totalCost: Number
  }
});

let ReservationTable = mongoose.Schema ({

  apptId: Number,
  startDate: Date,
  endDate: Date,
  fee: {
    nights: Number,
    cleanigFee: Number,
    price: Number,
    serviceFee: Number,
    total: Number,
  },
  guests: {
    adult: Number,
    children: Number,
    infants: Number
  }
});

let Reservations = mongoose.model('Reservations', ReservationTable);
let Calendar = mongoose.model('Calendar', ApartmentCalendar);

let getCalendarDataByApartment = (id, callback) => {
  Calendar.find({apartmentId: id, 'CalendarDays.available': false }, (err, result) => {
    if (err) {
      console.log('Error in DBFetch');
      //throw (err);
    } else {
      callback(null, result);
    }
  });
};

let getCostsByAppartment = (id, callback) => {
  //console.log('here');
  Calendar.find({apartmentId: id}, (err, result) => {
    if (err) {
      //console.log('here1');
      console.log('Error in Costs Fetching');
      //throw (err);
    } else {
      //console.log(result);
      callback (null, result[0]);
    }
  });
};

let makeReservation = (params, callback) => {
  console.log('in db makeReservation fucntion');
  let SaveReservation = new Reservations (params);

  SaveReservation.save ((err, data) => {
    if (err) {
      console.log('error saving reservation Data');
    } else {
      console.log ('reservation data saved');
      //callback(data);
    }
  });

};


module.exports = mongoose.connection;

module.exports.Calendar = Calendar;
module.exports.makeReservation = makeReservation;
module.exports.ApartmentCalendar = ApartmentCalendar;
module.exports.getCostsByAppartment = getCostsByAppartment;
module.exports.getCalendarDataByApartment = getCalendarDataByApartment;