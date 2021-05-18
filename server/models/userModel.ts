const { Pool } = require("pg");
require('dotenv').config();


//URI to elephantSQL database that will store the users favorite plants and any notes that add to those faves
const PG_URI = process.env.pgURI;

//create a new pool here using the connection string above
const pool = new Pool({
  connectionString: process.env['PGHOST'],
  password: process.env['PGPASSWORD']
});

// We export an object that contains a property called query,
// which is a function that returns the invocation of pool.query() after logging the query
// This will be required in the controllers to be the access point to the database

// exporting module with some console logs
module.exports = {
  query: (text:string, params, callback) => {
    // console.log("executed query", text);
    // console.log("executed params", params);
    // console.log("executed callback", callback);
    return pool.query(text, params, callback);
  },
};

/*
module.exports = {
  query: (text, params, callback) => {
    // console.log("executed query", text);
    params = pool.connectionString;
    // console.log("executed params", params);
    // console.log("executed callback", callback);
    return pool.query(text, params, callback);
  },
};
*/