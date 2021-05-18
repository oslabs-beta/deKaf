const { Kafka } = require('kafkajs');

const db = require('../models/userModel')
// const queue = require('../dataStorage/queue.js');

const producer = {};
console.log('in producer file')
producer.generateMessages = () => {
  // console.log('in generateMessage')
  // console.log(quantity)
  // if (quantity === undefined) quantity = 15;
  // let counter = 0;
  // console.log(quantity)
  // async function whileLoppFunc() {
    // while (counter < quantity) {
      setInterval(() => {
        queueRandomMessage()
      }, 3000)
      // counter += 1;
      // console.log(counter)
    }
  // }
  // whileLoppFunc();
// }

async function run(dataMessage) {
  try {
    const kafka = new Kafka({
      clientId: 'my-app',
      brokers: ['mike-Desktop:9092']
    })

    // const data = {value: 'hello', partition: 2};
    // const queryString = {
    //   text: 'INSERT INTO data (message, partition) VALUES ($1, $2)',
    //   values: ['hello', 2],
    //   rowMode: 'array'
    // }
    // console.log('dbing')
    // await db.query(queryString);

    const producer = kafka.producer();
    console.log('connecting to producer');
    await producer.connect();
    console.log('connected to producer');

    console.log('logger')
    const logger = await producer.logger().info();
    console.log(logger)

    console.log('producer events');
    console.log(producer.events);
    const { REQUEST } = producer.events;
    producer.on(REQUEST, (e) => {
      console.log(e);
    })

    
    //partition logic:
    // const partition = 
    

    //sending a batch of messages to multiple topics:

    // const topicMessages = [
    //   {
    //     topic: 'topic',
    //     message: [{key: 'key', value: 'something'}]
    //   }
    // ]
    // await producer.sendBatch({topicMessages})

    console.log('sending producer message')
    const topicMessages = [
      {
      topic: 'RandomGeneratedData',
      messages: [
        {
          key: 'key',
          value: JSON.stringify(dataMessage),
          // partition: partition
        }
      ]
    }
    ]
    await producer.sendBatch({ topicMessages })

    // await producer.send({
    //   topic: 'RandomGeneratedData',
    //   messages: [
    //     {
    //       value: JSON.stringify(dataMessage),
    //       // partition: partition
    //     }
    //   ]
    // })
  }
  catch (e) {
    console.log(`Something bad happened in the producer ${e}`)
  }
  finally {
    // process.exit(0)
  }
}

function queueRandomMessage() {
  console.log('in queue')
  const teammates = getRandomTeammate();
  const greetings = getRandomGreeting();
  const dataMessage = { teammates, greetings };
  run(dataMessage);
}

function getRandomTeammate() {
  const teammates = ['Mike', 'Jake', 'Billy', 'Noah', 'Achille']
  return teammates[Math.floor(Math.random() * teammates.length)];
}

function getRandomGreeting() {
  const greetings = ['hello!', 'good morning', 'good evening', 'nice to meet you', 'pleasure', 'hi', 'how are you', 'whats new', 'screw you', 'howdy'];
  return greetings[Math.floor(Math.random() * greetings.length)];
}
// run('test')
producer.generateMessages()

// module.exports = producer;




// [
//   { partitionId: 1, leader: 1 },
//   { partitionId: 2, leader: 2 },
//   { partitionId: 0, leader: 0 }
// ]

// const MyPartitioner = () => {
//   return ({ topic, partitionMetadata, message }) => {
//       // select a partition based on some logic
//       // return the partition number
//       return 0
//   }
// }