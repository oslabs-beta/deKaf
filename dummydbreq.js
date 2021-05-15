const db = require('./server/models/userModel')

async function addtodb() {
  const queryString = {
    text: 'INSERT INTO data (message, partition) VALUES ($1, $2)',
    values: ['test', 'partitiontest'],
    rowMode: 'array'
  }
  await db.query(queryString);
  return;
}
addtodb()
.catch(err => console.log(`console log error ${err}`))
