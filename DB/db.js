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

// ------- SDC -------------

let makeReservation = (params, callback) => {
  console.log('in db makeReservation fucntion');
  let NewReservation = new Calendar (params);
  NewReservation.save ((err, data) => {
    if (err) {
      console.log('error saving reservation Data');
      return callback(err);
    } else {
      console.log ('reservation data saved');
      return callback(null);
    }
  });

};

let updateReservation = (req, callback) => {
  Calendar.find({apartmentId: req.apartmentId}, (err, result) => {
    if (err) {
      console.error(err);
    } else {
      //Calendar.update(apartmentId: req.apartmentId)
      //db.collection.update({querry, update})
      console.log('Update Me');
      if (err) {
        return callback(err);
      } else {
        return callback(null);
      }
    }
  });
};

let deleteReservation = (req, callback) => {
  Calendar.deleteOne({req}, (err) => {
    if (err) {
      callback(err);
    } else {
      callback(null);
    }
  });
};



module.exports = mongoose.connection;

module.exports.Calendar = Calendar;
module.exports.ApartmentCalendar = ApartmentCalendar;
module.exports.getCostsByAppartment = getCostsByAppartment;
module.exports.getCalendarDataByApartment = getCalendarDataByApartment;

module.exports.makeReservation = makeReservation;
module.exports.deleteReservation = deleteReservation;