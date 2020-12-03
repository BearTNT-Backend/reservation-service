const db = require('./db.js');
const dates = require('./data.js');


let calendarDates = dates.getDates(new Date(), (new Date()).addDays(365));

let populateData = () => {
  for (let i = 1; i <= 3; i++) {
    let id = i;
    db.Calendar.find({apartmentId: id}, (err, result) => { // test if data at i already
      if (err) {
        console.log('Error in populateData');
        throw (err);
      }
      if (result === undefined || result.length === 0 || ! result) { // if there is no data or the data is bad populate it
        let nGuests = 1 + Math.floor(Math.random() * 10);
        let aptCost = 100 + Math.floor(Math.random() * 50);
        let cleanCost = Math.floor(aptCost * 0.1);
        let servCost = Math.floor(aptCost * 0.15);
        let total = aptCost + cleanCost + servCost;
        for (let j = 0; j < calendarDates.length; j++) {
          let ApartmentCalendarDay = new db.Calendar ({
            apartmentId: id,
            commonID: id,
            CalendarDays: {
              date: calendarDates[j],
              available: Math.random() > 0.7 ? false : true,
              totalGuests: nGuests,
              apartmentCost: aptCost,
              cleaningCost: cleanCost,
              serviceCost: servCost,
              totalCost: total
            }
          });
          ApartmentCalendarDay.save((err, calendarDat) =>{
            if (err) {
              console.log('save error', err);
            } else {
              console.log('saved', i);
            }
          });
        }
      }
    });

  }
};
populateData(); // should mongoose disconnect
console.log(calendarDates);