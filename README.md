# System Design Capstone

- Outfitting the backend of a small application to handle 10 million primary records and test read write speeds of different databases.

## Table of Contents

1. Usage
2. System Requirments
3. Running App

## Usage

-start mySql service
   $ sudo service mysql start
- Create DB 
   $ mysql -u root -p < ./DB/MYSQL/schema.sql
- Create CSV file of fake data
   $ npm run seedCSV
- Load into mySQL DB
  - make allow local mySql use from shell
     mysql> SET GLOBAL local_infile=1;
  $ npm run seedMsql

## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 6.13.0
- mySQL 8.0.22

## Development

### Installing Dependencies

From within the root directory:

```sh
npm install -g webpack
npm install
```

