const db = require('../models/userModel')

class dataStructures {
  constructor() {
    this.messageArray = [];
  }

  queue(data) {
    this.messageArray.push(data);
    console.log(this.messageArray)
    // addToDb(data)
  }

  print(){
    console.log(this.messageArray)
  }
}

const test = new dataStructures()
test.print()

async function addToDb(data) {
  const { value, partition } = data;
  const queryString = {
    text: 'INSERT INTO data (message, partition) VALUES ($1, $2)',
    values: [value, partition],
    rowMode: 'array'
  }
  await db.query(queryString);
  return;
}
// caddToDb({})

module.exports = dataStructures;
// const queue = {
//   messageArray: []
// };

// queue.add = (currentMessage) => {
//   console.log('in the queue')
//   this.messageArray.push(currentMessage);
//   console.log(messageArray)
//   return;
// }