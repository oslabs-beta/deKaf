const { Kafka } = require('kafkajs');

const db = require('../models/userModel.ts');
const mockData = require('./mockData')
// const topic = require('./topic');
// const queue = require('../dataStorage/queue.js');

const producer = {};


console.log('in producer file')
producer.generateMessages = (producerData) => {
    const { random } = producerData;
    if (random === true) {
      setInterval(() => {
        queueRandomMessage(producerData)
      }, 6500)
    }
    else {
      let dataMessage;
      run(dataMessage, producerData);
    }
  }
  // }
  // whileLoppFunc();
// }

async function run(dataMessage, producerData) {
  console.log('in the producer.run!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
  console.log(dataMessage)
  const { port, topics, username } = producerData
  try {
    const kafka = new Kafka({
      clientId: 'my-app',
      brokers: [`:${port}`]
    })

    const producer = kafka.producer();
    console.log('connecting to producer');
    await producer.connect();
    console.log('connected to producer');
    if (dataMessage) {
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
        let time = timestamp.toString();
        const queryString = {
          text: `INSERT INTO producer (request_data, messageId, timestamp, username) VALUES ($1, $2, $3, $4)`,
          values: [payload, messageId, time, username],
          rowMode: 'array'
        }
        await db.query(queryString);
        console.log('producer added to DB')
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
      const topicMessagesArray = (topics) => {
        let newMessage = [dataMessage, messageId]
        let topicArray = [];
        let topicObject = {};
        topics.forEach((el) => {
          topicObject['topic'] = el;
          topicObject['messages'] = [{key: 'key', value: JSON.stringify(newMessage)}]
          topicArray.push(topicObject);
          topicObject = {};
        })
        return topicArray;
      } 
      const topicMessages = topicMessagesArray(topics)
      console.log(topicArray)
      console.log('sending producer message')
      // let newMessage = [dataMessage, messageId]
      // const topicMessages = [
      //   {
      //   topic: 'RandomGeneratedData',
      //   messages: [
      //     {
      //       key: 'key',
      //       value: JSON.stringify(newMessage),
      //       // partition: partition
      //     }
      //   ]
      // }
      // // {
      // //   topic: 'thisIsATest',
      // //   messages: [
      // //     {
      // //       value: JSON.stringify('hello')
      // //     }
      // //   ]
      // // }
      // ]
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
  }
  catch (e) {
    console.log(`Something bad happened in the producer ${e}`)
  }
  finally {
    // process.exit(0)
  }
}

function queueRandomMessage(producerData) {
  const randomDataNum = Math.ceil(Math.random() * 700)
  console.log('randomNum:')
  console.log(randomDataNum)
  const { data } = mockData;
  const dataMessage = data[randomDataNum];
  console.log('mock data has been created')
  run(dataMessage, producerData);
}

console.log('end of producer')
module.exports = producer;
