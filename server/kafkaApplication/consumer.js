const { Kafka } = require('kafkajs');
const { logLevel } = require('kafkajs')
const winston = require('winston')
const db = require('../models/userModel.ts');
// const topic = require('./topic');
const EventEmitter = require('events');
const { least } = require('d3-array');


//initializing a consumer object
const consumer = {}
class MyEmitter extends EventEmitter {};
//everything in this function will be the consumer logic
consumer.run = async (consumerData) => {
  let { port, topics, userId} = consumerData;
  if (userId === undefined) userId = 3;
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
  
  //initializing a new kafka object
    const kafka = new Kafka({
      clientId: 'my-app',
      brokers: [`:${port}`],
      logLevel: logLevel.ERROR,
      logCreator: WinstonLogCreator
    })
    
    //connecting the kafka object to the consumer
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
    // const subscribingToTopics = (topics) => {
    //   const topicObject = {}
    //   topics.forEach( async (el) => {
    //     topicObject['topic'] = el;
    //     topicObject['fromBeginning'] = true;
    //     console.log('subscribing to topic')
    //     await consumer.subscribe(topicObject)
    //     console.log('subscribed')
    //     topicObject = {};
    //   }
      // .catch(err => console.log('there was an error when subscribing to topic ', err))
      // )
      
    // }
    // await subscribingToTopics(topics)


    await consumer.subscribe({
      //add multiple topics later
      topic: 'RandomGeneratedData',
      fromBeginning: true
    })
    // await consumer.subscribe({
    //   //add multiple topics later
    //   topic: 'thisIsATest',
    //   fromBeginning: true
    // })
    

    console.log('logger')
    const logger = await consumer.logger().info();
    console.log(logger)

    //running the consumer to collect the data being sent from the producer
    //this will be used if the producer wants to send messages in batches
    await consumer.run({
      // eachMessage: console.log('in each message'),
      eachBatchAutoResolve: true,
      'eachBatch': async ({
        batch,
        resolveOffset,
        heartbeat,
        commitOffsetsIfNecessary,
        uncommittedOffsets,
        isRunning,
        isStale,
      }) => {
        console.log('in the batch messages')
        //grabbing the random message Id from the message sent from the producer
        // console.log(batch)
        const { messageId, message } = getMessageId(batch)
        console.log(message)
        const { partition, topic, fetchedOffset} = batch;
        // console.log(`partition: ${partition}`);
        // console.log(`topic: ${topic}`);
        // console.log(`fetchedOffset: ${fetchedOffset}`)

        // storing the message, topic, partition in the db
        const dataId = await mainMessageQueryFunc(topic, partition, message, userId);
    // //     // console.log(dataId);
        
    //     //deconstructing some of the instances events associated with the consumer to gather future data
        const { REQUEST, FETCH, GROUP_JOIN, START_BATCH_PROCESS } = consumer.events;
        
    //     //gathering data from the request event
        requestFunc(REQUEST, dataId, messageId);
        // request()
    //     //gathering data from the fetch event
    //     const fetch = fetchFunc(FETCH, dataId);
        
    //     //gathering data on groupJoin event
    //     const groupJoin = groupJoinFunc(GROUP_JOIN, dataId)

    //     //gathering data on the batch request event
    //     const batchReqest = await startBatchProcessFun(START_BATCH_PROCESS, dataId)
          await heartbeat()
      }

    })

    //helper function to grab the messageId sent from the producer

    function getMessageId(batch) {
      const testMessage = batch.messages[0].value.toString();
      const arr = testMessage.split(',');
      const messageId = parseInt(arr.pop());
      console.log(messageId)
      let newString = arr.join(',')
      let message = newString.slice(1, newString.length)
      return {messageId: messageId, message: message}
    }


    /****  Methods to grab data pertaining to the messages and uploading to the database for the client to use *****/

    //sending topic, partition, message and userId data to the consumer table
    async function mainMessageQueryFunc(topic, partition, message, userId) {
      console.log('in the message func!!!!!!!!!!!!!!!!!!')
      const messageData = {
        value: message,
        partition: partition,
        topic: topic
      }
      // console.log(`messageData ${messageData}`)
      const queryString = {
        text: 'INSERT INTO consumers (user_id, message_data, partition) VALUES ($1, $2, $3) RETURNING _id AS dataId',
        values: [userId, messageData, partition],
        rowMode: 'array'
      }
      console.log('before query')
      const result = await db.query(queryString)
      .catch(e => console.log(`error in addTodb`, e));
      const dataId = result.rows[0][0];
      console.log(`dataId: ${dataId}`)
      return dataId;
    }
    
    //sending information about the request data and the unique messageId to the consumer_requests SQL table
    async function requestFunc(REQUEST, dataId, messageId) {
      console.log('in the request func!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
      let eventOn = false;
      // function callEvent () {
        const req = await consumer.on(REQUEST, async (e) => {
          console.log('in the request fun')
          // console.log(e)
          const { timestamp, payload } = e;
          console.log('size:')
          console.log(e.payload.size)
          let time = timestamp.toString();
          // console.log('payload')
          // console.log(payload)
          const queryString = {
            text: 'INSERT INTO consumer_requests (request_data, data_id, messageid, timestamp) VALUES ($1, $2, $3, $4)',
            values: [payload, dataId, messageId, time],
            rowMode: 'array'
          }
          console.log('before query')
          await db.query(queryString)
          .then(() => {
            console.log('toggling event on &&&&&&&&&&&&&&&&&&&&&&&');
            eventOn = true;
            console.log(eventOn)
          })
          .catch(e => console.log(`error in addTodb`, e));
          
          // consumer.removeListener();
          // consumer.pause();
          // return;
          req();
        })
        // req();
      // }
      // await callEvent();
      console.log('before conditional#######')
      if (eventOn === true) {
        console.log('turning event off *********************************')
        req();
      }
        

      // }
      // 
    }    

    async function startBatchProcessFun(START_BATCH_PROCESS, dataId) {
      const startBatch = consumer.on(START_BATCH_PROCESS, async (e) => {
        console.log('in the start batch')
        console.log(e)
      })
      // startBatch()
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

// const consumerData = {port: '9092', topics: ['RandomGeneratedData'], userId: 3}
// userId = 3;
// consumer.run(consumerData);

module.exports = consumer;



