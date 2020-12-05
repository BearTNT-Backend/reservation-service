
-- start mysql and seed schema via the following
-- sudo service mysql start
-- mysql -u root -p < schema.sql

CREATE DATABASE IF NOT EXISTS sdc;

USE sdc;

CREATE TABLE IF NOT EXISTS reservations (
  resId int NOT NULL AUTO_INCREMENT,
  listingKey int NOT NULL UNIQUE,
  startDate DATE NOT NULL,
  endDate DATE NOT NULL,
  adults int,
  children int,
  infants int,
  PRIMARY KEY (resId),
  FOREIGN KEY (listingKey) REFERENCES listings(reservationKey)
);

CREATE TABLE IF NOT EXISTS listings (
  listingId int NOT NULL AUTO_INCREMENT,
  reservationKey int NOT NULL UNIQUE,
  occupency int NOT NULL,
  feeNightly int,
  feeService int,
  feeCleaning int,
  rating float,
  numRatings int,
  PRIMARY KEY (aptId)
);


