const faker = require('faker');

// let ApartmentCalendar = mongoose.Schema ({
//   apartmentId: Number,
//   commonID: Number,
//   CalendarDays: {
//     id: Number,
//     date: Date,
//     available: Boolean,
//     totalGuests: Number,
//     apartmentCost: Number,
//     cleaningCost: Number,
//     serviceCost: Number,
//     totalCost: Number
//   }
// });


Date.prototype.addDays = function(days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};

// eslint-disable-next-line func-style
function getDates(startDate, stopDate) {
  var dateArray = new Array();
  var currentDate = startDate;
  while (currentDate <= stopDate) {
    dateArray.push(new Date (currentDate));
    currentDate = currentDate.addDays(1);
  }
  return dateArray;
}

//let calendarDates = getDates(new Date(), (new Date()).addDays(365));
//console.log(arr);

module.exports.getDates = getDates;
