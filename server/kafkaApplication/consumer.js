const { Kafka } = require('kafkajs');
const { logLevel } = require('kafkajs')
const winston = require('winston')
const fs = require('fs')
const path = require('path')
const EventEmitter = require('events')

// const dataStructures = require('../dataStructures/queue.js')
const db = require('../models/userModel.ts');


//initializing a consumer object
const consumer = {}
class MyEmitter extends EventEmitter {}
//everything in this function will be the consumer logic
consumer.run = async (userId) => {
  try 
  {
    //this winston function will be to track errors and store them in a log
    const toWinstonLogLevel = level => { switch(level) {
      case logLevel.ERROR:
      case logLevel.NOTHING:
          return 'error'
      case logLevel.WARN:
          return 'warn'
      case logLevel.INFO:
          return 'info'
      case logLevel.DEBUG:
          return 'debug'
  }
}

    const WinstonLogCreator = logLevel => {
      const logger = winston.createLogger({
          level: toWinstonLogLevel(logLevel),
          transports: [
              new winston.transports.Console(),
              new winston.transports.File({ filename: 'myapp.log' })
          ]
      })
  
      return ({ namespace, level, label, log }) => {
          const { message, ...extra } = log
          console.log('test')
          logger.log({
              level: toWinstonLogLevel(level),
              message,
              extra,
          })
      }
  }
  const myEmitter = new MyEmitter()
  //initializing a new kafka object
    const kafka = new Kafka({
      clientId: 'my-app',
      brokers: [':9092'],
      logLevel: logLevel.ERROR,
      logCreator: WinstonLogCreator
    })
    // const buffer = new dataStructures()
    //initializing a consumer
    const consumer = kafka.consumer({
      groupId: 'my-group',
      // partitionAssigners: [0,1,2,3,4],
      sessionTimeout: 30000,
      // rebalanceTimeout: 60000,
      // heartbeatInterval: 3000,
      // metadataMaxAge: 30000,
      // allowAutoTopicCreation: true
    })
    
    console.log('connection to consumer...')
    //connecting consumer
    await consumer.connect();
    console.log('connected to consumer')
    //subscribing this consumer to the topic
    await consumer.subscribe({
      //add multiple topics later
      topic: 'RandomGeneratedData',
      fromBeginning: true
    })

    console.log('logger')
    const logger = await consumer.logger().info();
    console.log(logger)

    //running the consumer to collect the data being sent from the producer
    //this will be used if the producer wants to send messages in batches
    // await consumer.run({
    //   eachBatchAutoResolve: true,
    //   eachBatch: async ({
    //     batch,
    //     resolveOffset,
    //     heartbeat,
    //     commitOffsetsIfNecessary,
    //     uncommittedOffsets,
    //     isRunning,
    //     isStale,
    //   }) => {
    //     console.log(batch.messages[0].value.toString());
    //     console.log(batch.partition);
    //     // const messageQ = batch.messages[0].value.toString();
    //       // const partition = batch.partition;
         
    //       messageQ = 'this is a test from the batch';
    //       partition = 27;
    //       const queryString = {
    //         text: 'INSERT INTO data (message, partition) VALUES ($1, $2)',
    //         values: [messageQ, partition],
    //         rowMode: 'array'
    //       }
    //       console.log('before query')
    //       await db.query(queryString)
    //       .catch(e => console.log(`error in addTodb`, e));

    //     // console.log(JSON.stringify(batch.message[0].value))
    //     console.log(batch.highWatermark)
    //       // console.log({
    //       //   topic: batch.topic,
    //       //   partition: batch.partition,
    //       //   highWatermark: batch.highWatermark,
    //       //   batch.message: {
    //       //     offset: message.offset,
    //       //     key: message.key.toString(),
    //       //     value: message.value.toString()
    //       //   }
    //       // })
    //       // resolveOffset(message.offset)
    //       await heartbeat()
    //     // }
    //   },
    // })
    // console.log('before run')
    // console.log(consumer.events)
    //running the consumer again. This one is for the producer sending data as individual messages
    await consumer.run({
      //initializing an async function for the value of eachMessage
      'eachMessage': async ({ topic, partition, message }) => {
        console.log('in the consumer running');

        //querying the main message into the db
        const dataId = await mainMessageQueryFunc(topic, partition, message, userId);
        // console.log(dataId);

        // console.log(consumer.events)
        // deconstructing the events our of consumer
        const { REQUEST, FETCH, GROUP_JOIN } = consumer.events;
        const request = requestFunc(REQUEST, dataId);
        // const fetch = fetchFunc(FETCH, dataId);
        // console.log(GROUP_JOIN)
        // const groupJoin = groupJoinFunc(GROUP_JOIN, dataId)
      }
    })

    //all the query functions will be below:
    //function to query the main message data
    async function mainMessageQueryFunc(topic, partition, message, userId) {
      const messageData = {
        value: message.value.toString(),
        partition: partition,
        topic: topic
      }
      console.log('messageData')
      console.log(messageData)
      // const testQueryString = {
      //   text: `INSERT INTO data2 (message, partition) VALUES ($1, $2)`,
      //   values: ['this is another test', 1],
      //   rowMode: 'array'
      // }
      const queryString = {
        text: 'INSERT INTO consumers (user_id, message_data, partition) VALUES ($1, $2, $3) RETURNING _id AS dataId',
        values: [userId, messageData, partition],
        rowMode: 'array'
      }
      console.log('before query')
      // const testQuery = await db.query(testQueryString)
      const result = await db.query(queryString)
      // .catch(e => console.log(`error in addTodb`, e));
      // console.log(result)
      const dataId = result.rows[0][0];
      // console.log(dataId)
      return dataId;
    }

    async function requestFunc(REQUEST, dataId) {
      const req = consumer.on(REQUEST, async (e) => {
        console.log('in the request fun')
        // console.log(e)
        const { payload } = e;
        // console.log(payload)
        const queryString = {
          text: 'INSERT INTO consumer_requests (request_data, data_id) VALUES ($1, $2)',
          values: [payload, dataId],
          rowMode: 'array'
        }
        console.log('before query')
        await db.query(queryString)
        .catch(e => console.log(`error in addTodb`, e));
        // consumer.removeListener();
        // consumer.pause();
        return;
      })
      console.log(req)
      req();
      return req;
    }
    
    function fetchFunc(FETCH) {
      consumer.on(FETCH, (e) => {
        console.log('in the fetch func')
        // console.log(e)
        return e
      })
    }

    function groupJoinFunc(GROUP_JOIN, dataId) {
      consumer.on(GROUP_JOIN, (e) => {
        console.log(e)
      })
    }
  }

  
  catch(e) {
    console.log(`Something bad happened in the consumer ${e}`)
  }
  finally {
    console.log('closed out of consumer')
    // consumer.close()
  }
}
//userId = 3;
//consumer.run(userId);
module.exports = consumer;

/*
What is the problem:

too many connections to the database. We are running a kafka application and sending multiple request to the database at the same time from the broker, producer and consumer. In order to render certain metrics we are opening up consumer and producer events and then querying those to the postgres server. However it appears these connections never close and after a few messages the postgres server says there's too many connections
ror when calling eachMessage","extra":{"timestamp":"2021-05-19T01:41:45.087Z","logger":"kafkajs","topic":"RandomGeneratedData","partition":0,"offset":"62","stack":"error: too many connections for role \"dcfhozpo\"\n 
What did you expect to happen?
I expected the queries to be entered into the database. Individually they all work but together they break.

What have I tried?
I have made sure a
*/

