const { Pool } = require("pg");
require('dotenv').config();


//URI to elephantSQL database that will store the users favorite plants and any notes that add to those faves
const PG_URI = process.env.pgURI;

//create a new pool here using the connection string above
const pool = new Pool({
  conectionString: 'postgres://dcfhozpo:KK6z32AwCvw7KJxeWk_tuPnfdC7QlvnO@queenie.db.elephantsql.com:5432/dcfhozpo'
  // connectionString: process.env['PGCONNECT'],
  // user: process.env['PGUSER'],
  // password: process.env['PGPASSWORD'],
  // host: process.env['PGHOST'],
  // database: process.env['PGDATABASE'],
  // port: process.env['PGPORT'],
});

// We export an object that contains a property called query,
// which is a function that returns the invocation of pool.query() after logging the query
// This will be required in the controllers to be the access point to the database

// exporting module with some console logs

module.exports = {
  query: async (text, params, callback) => {
    const client = await pool.connect();
    let res;

    try{
      await client.query('BEGIN');
      res = await client.query(text, params, callback);
      await client.query('COMMIT');
    } catch (e) {
      await client.query('ROLLBACK');
      console.error(e);
    } finally {
      console.log('in the userModel finally')
      client.release();
    }
    return res;
  },
};


// module.exports = {
//   query: (text, params, callback) => {
//     // console.log("executed query", text);
//     params = pool.connectionString;
//     // console.log("executed params", params);
//     // console.log("executed callback", callback);
//     return pool.query(text, params, callback);
//   },
// };
