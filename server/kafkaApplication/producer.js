const { Kafka } = require('kafkajs');

const db = require('../models/userModel.ts');
// const topic = require('./topic');
// const queue = require('../dataStorage/queue.js');

const producer = {};
console.log('in producer file')
producer.generateMessages = (producerData) => {

      setInterval(() => {
        queueRandomMessage(producerData)
      }, 6500)
    }
  // }
  // whileLoppFunc();
// }

async function run(dataMessage, producerData) {
  const { port, topics } = producerData
  try {
    const kafka = new Kafka({
      clientId: 'my-app',
      brokers: [`:${port}`]
    })

    const producer = kafka.producer();
    console.log('connecting to producer');
    await producer.connect();
    console.log('connected to producer');

    // console.log('logger')
    // const logger = await producer.logger().info();
    // console.log(logger)
    // function randomId () {
    const messageId = Math.ceil(Math.random() * 1000000000000) 
    // }
    // console.log('producer events');
    // console.log(producer.events);
    const { REQUEST } = producer.events;
    const prod = producer.on(REQUEST, async (e) => {
      // console.log(e);
      
      const { timestamp, payload } = e;
      const queryString = {
        text: `INSERT INTO producer (request_data, messageId, timestamp) VALUES ($1, $2, $3)`,
        values: [payload, messageId, timestamp],
        rowMode: 'array'
      }
      await db.query(queryString);
      prod();
    })

    
    //partition logic:
    // ['Mike', 'Jake', 'Billy', 'Noah', 'Achille']
    // let partition;
    // const { teammates } = dataMessage;
    // console.log(teammates)
    // if (teammates === 'Mike') partition = 0;
    // else if (teammates === 'Jake') partition = 1;
    // else if (teammates === 'Billy') partition = 2;
    // else if (teammates === 'Noah') partition = 3;
    // else if (teammates === 'Achille') partition = 4;
    

    //sending a batch of messages to multiple topics:

    // const topicMessages = [
    //   {
    //     topic: 'topic',
    //     message: [{key: 'key', value: 'something'}]
    //   }
    // ]
    // await producer.sendBatch({topicMessages})

// message : "MESSAGE"
// message: ["MESSAGE", dataId]
// //input that timestamp into that dataId's column
// // at the point of output, just subtract that from message[2]
// message[0], message[1] < --- message[1]
  //random Id and timestamp

  // producer -> dataId & all of the producerData
  // consumer -> dataId & all of the consumerData

  //grab timeStamp WHERE dataId = 

  //in consumer, cross examine random Id from
  //[ randomId |timestamp in | timestamp out  ]
  //on the consumer, SELECT randomId WHERE = randomId of the latest received consumer data
  //upon reception, input the second timestamp and then subtract from the first
  //include that as latency in output middleware
    // const topicMessagesArray = (topics) => {
    //   let newMessage = [dataMessage, messageId]
    //   let topicArray = [];
    //   let topicObject = {};
    //   topics.forEach((el) => {
    //     topicObject['topic'] = el;
    //     topicObject['messages'] = [{key: 'key', value: JSON.stringify(newMessage)}]
    //     topicArray.push(topicObject);
    //     topicObject = {};
    //   })
    //   return topicArray;
    // } 
    // const topicArray = topicMessagesArray(topics)
    // console.log(topicArray)
    // console.log('sending producer message')
    let newMessage = [dataMessage, messageId]
    const topicMessages = [
      {
      topic: 'RandomGeneratedData',
      messages: [
        {
          key: 'key',
          value: JSON.stringify(newMessage),
          // partition: partition
        }
      ]
    }
    // {
    //   topic: 'thisIsATest',
    //   messages: [
    //     {
    //       value: JSON.stringify('hello')
    //     }
    //   ]
    // }
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

function queueRandomMessage(producerData) {
  console.log('in queue')
  const teammates = getRandomTeammate();
  const greetings = getRandomGreeting();
  const dataMessage = { teammates, greetings };
  run(dataMessage, producerData);
}

function getRandomTeammate() {
  const teammates = ['Mike', 'Jake', 'Billy', 'Noah', 'Achille']
  return teammates[Math.floor(Math.random() * teammates.length)];
}

// data1 = {'mike', 'hello'} => topic(1) => partion 1 => topic(2) => partion 3
// data2 = {'jake', 'good morning'} => topic(1) => partion 2
function getRandomGreeting() {
  const greetings = ['hello!', 'good morning', 'good evening', 'nice to meet you', 'pleasure', 'hi', 'how are you', 'whats new', 'screw you', 'howdy'];
  return greetings[Math.floor(Math.random() * greetings.length)];
}
// run('test')

// const producerData = {port: '9092', topics: ['RandomGeneratedData']}
// producer.generateMessages(producerData)


console.log('end of producer')
module.exports = producer;




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