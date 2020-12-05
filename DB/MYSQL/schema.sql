
-- start mysql and seed schema via the following
-- sudo service mysql start
-- from root directory
-- mysql -u root -p < ./DB/MYSQL/schema.sql

DROP DATABASE sdc;
CREATE DATABASE IF NOT EXISTS sdc;

USE sdc;

CREATE TABLE IF NOT EXISTS listings (
  listingId int NOT NULL UNIQUE  AUTO_INCREMENT,
  -- reservationKey int NOT NULL UNIQUE, get via join querry ??
  occupency int NOT NULL,
  feeNightly int,
  feeService int,
  feeCleaning int,
  rating float,
  numRatings int,
  PRIMARY KEY (listingId)
);

CREATE TABLE IF NOT EXISTS reservations (
  resId int NOT NULL AUTO_INCREMENT,
  listingKey int NOT NULL,
  startDate DATE NOT NULL,
  endDate DATE NOT NULL,
  adults int,
  children int,
  infants int,
  PRIMARY KEY (resId),
  FOREIGN KEY (listingKey) REFERENCES listings(listingId)
);
