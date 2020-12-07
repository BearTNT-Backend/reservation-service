// runs all seeding files to create a csv file and and populate all databases


const csvSeed = require('./seedCSV.js');
const mySQlSeed = require('./populateMySQL.js');
// cassandra

  // seed csv files function call
  let main = async () => {
    await csvSeed();
    await mySqlSeed();
  }
  main();
