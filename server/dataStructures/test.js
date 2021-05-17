const dataStructures = require('../dataStructures/queue.js')
const db = require('../models/userModel');
function test() {
  const messageQ = 'this is a big test';
  const partition = 25;
  const queryString = {
    text: 'INSERT INTO data2 (message, partition) VALUES ($1, $2)',
    values: [messageQ, partition],
    rowMode: 'array'
  }
  console.log('before query')
  db.query(queryString)
  .catch(e => console.log(`error in addTodb`, e));
  // const buffer = new dataStructures()
  // buffer.print();
}


test()