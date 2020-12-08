
-- start mysql and seed schema via the following
-- sudo service mysql start
-- from root directory
-- mysql -u root -p < ./DB/MYSQL/schema.sql

DROP DATABASE IF EXISTS  sdc;
CREATE DATABASE  sdc;

USE sdc;

-- listingId int NOT NULL AUTO_INCREMENT -- not workding


CREATE TABLE IF NOT EXISTS listings (
  listingId int NOT NULL AUTO_INCREMENT,
  occupancy int NOT NULL,
  feeNightly int,
  feeService int,
  feeCleaning int,
  rating decimal(3,2),
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
