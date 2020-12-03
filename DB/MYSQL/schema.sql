
CREATE IF NOT EXISTS DATABASE sdc;

USE sdc;

CREATE TABLE listings (
  aptId int NOT NULL AUTO_INCREMENT,
  reservations int,
  occupencyAdult int NOT NULL,
  occupencyChild int,
  occupencyInfant int,
  feeApt int,
  feeService int,
  feeCleaning int,
  rating float,
  numRatings int,
  PRIMARY KEY (aptId),
  FOREIGN KEY (reservations) REFERENCES reservations(aptKey)
);

CREATE TABLE reservations (
  resId int NOT NULL AUTO_INCREMENT,
  aptKey int,
  startDate DATE NOT NULL,
  endDate DATE NOT NULL,
  adults int,
  children int,
  infants int,
  PRIMARY KEY (resId)
);
