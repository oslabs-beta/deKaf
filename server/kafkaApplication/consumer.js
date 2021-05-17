const { Kafka } = require('kafkajs');
const { logLevel } = require('kafkajs')
const winston = require('winston')
const fs = require('fs')
const path = require('path')

const dataStructures = require('../dataStructures/queue.js')
const db = require('../models/userModel');
// const { POINT_CONVERSION_UNCOMPRESSED } = require('node:constants');

const consumer = {}


consumer.run = async () => {
  try 
  {
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
    const kafka = new Kafka({
      clientId: 'my-app',
      brokers: ['mike-Desktop:9092'],
      logLevel: logLevel.ERROR,
      logCreator: WinstonLogCreator
    })
    const buffer = new dataStructures()
    const consumer = kafka.consumer({
      groupId: 'my-group',
      // partitionAssigners: [1,2],
      // sessionTimeout: 30000,
      // rebalanceTimeout: 60000,
      // heartbeatInterval: 3000,
      // metadataMaxAge: 30000,
      // allowAutoTopicCreation: true
    })

    console.log('connection to consumer...')
    await consumer.connect();
    console.log('connected to consumer')
    await consumer.subscribe({
      //add multiple topics later
      topic: 'RandomGeneratedData',
      fromBeginning: true
    })

    console.log('logger')
    const logger = await consumer.logger().info();
    console.log(logger)

    
    await consumer.run({
      eachBatchAutoResolve: true,
      eachBatch: async ({
        batch,
        resolveOffset,
        heartbeat,
        commitOffsetsIfNecessary,
        uncommittedOffsets,
        isRunning,
        isStale,
      }) => {
        console.log(batch.messages[0].value.toString());
        console.log(batch.partition);
        // const messageQ = batch.messages[0].value.toString();
          // const partition = batch.partition;
         
          messageQ = 'this is a test from the batch';
          partition = 27;
          const queryString = {
            text: 'INSERT INTO data (message, partition) VALUES ($1, $2)',
            values: [messageQ, partition],
            rowMode: 'array'
          }
          console.log('before query')
          await db.query(queryString)
          .catch(e => console.log(`error in addTodb`, e));

        // console.log(JSON.stringify(batch.message[0].value))
        console.log(batch.highWatermark)
          // console.log({
          //   topic: batch.topic,
          //   partition: batch.partition,
          //   highWatermark: batch.highWatermark,
          //   batch.message: {
          //     offset: message.offset,
          //     key: message.key.toString(),
          //     value: message.value.toString()
          //   }
          // })
          // resolveOffset(message.offset)
          await heartbeat()
        // }
      },
    })


    // await consumer.run({
    //   'eachMessage': async ({ topic, partition, message }) => {
    //     console.log('in the consumer running')
    //     console.log({
    //       // key: message.key.toString(),
    //       value: message.value.toString(),
    //       partition: partition,
    //       topic: topic
    //     })
    //     // let data = {value: message.value.toString(), partition: partition}
    //     // buffer.queue(data)
    //     console.log(consumer.events)
    //     const { REQUEST, FETCH } = consumer.events;
    //     const request = requestFunc(REQUEST);
    //     // console.log(request)
    //     // const req = consumer.on(REQUEST, (e) => {
    //     //   console.log('in the request fun')
    //     //   // console.log(e)
    //     //   const { payload } = e
    //     //   // console.log(payload)
    //     //   // const messageQ = 'in the request';
    //     //   // const partition = 5;
    //     //   // const queryString = {
    //     //   //   text: 'INSERT INTO data (message, partition) VALUES ($1, $2)',
    //     //   //   values: [messageQ, partition],
    //     //   //   rowMode: 'array'
    //     //   // }
    //     //   // console.log('before query')
    //     //   // db.query(queryString)
    //     //   // .catch(e => console.log(`error in addTodb`, e));
    //     //   return payload
          
    //     // })
    //     // console.log('outside of on')
    //     // console.log(req)
    //     // // const fetch = fetchFunc(FETCH);
    //     // const data = {value:  message.value.toString(), partition: partition};
    //     // const sampleData = JSON.stringify(data)
    //     // console.log('before write fole sybz')
    //     // // fs.appendFileSync('./sampleData.json', sampleData)
    //     // console.log('after file sync')
    //     // console.log(request);
    //     const messageQ = 'this is a big test';
    //     const queryString = {
    //       text: 'INSERT INTO data2 (message, partition) VALUES ($1, $2)',
    //       values: [messageQ, partition],
    //       rowMode: 'array'
    //     }
    //     console.log('before query')
    //     db.query(queryString)
    //     .catch(e => console.log(`error in addTodb`, e));
    //     // console.log('after query')
    //     // addToDb(data)
    //     // addToDb(data)
    //     // .catch(err => console.log(`error adding to db ${err}`, err))
        
    //     // console.log('test')
    //     // let str = message.value.toString()
    //     // queue.add(str)
    //     // console.log('consumer events');
    //     // console.log(consumer.events)
    //     // consumer.close();
    //   }
    // })
    function requestFunc(REQUEST) {
      const req = consumer.on(REQUEST, (e) => {
        console.log('in the request fun')
        // console.log(e)
        const { payload } = e
        // console.log(payload)
        const messageQ = 'in the request';
        const partition = 5;
        const queryString = {
          text: 'INSERT INTO data (message, partition) VALUES ($1, $2)',
          values: [messageQ, partition],
          rowMode: 'array'
        }
        console.log('before query')
        db.query(queryString)
        .catch(e => console.log(`error in addTodb`, e));
        return payload
        consumer.stop();
      })
      console.log(req)
      return req;
    }
    
    function fetchFunc(FETCH) {
      consumer.on(FETCH, (e) => {
        console.log('in the fetch func')
        // console.log(e)
        return e
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

function addToDb(data) {
  const { value, partition } = data;
  const queryString = {
    text: 'INSERT INTO data (message, partition) VALUES ($1, $2)',
    values: [value, partition],
    rowMode: 'array'
  }
  db.query(queryString)
  .catch(e => console.log(`error in addTodb ${e.stack}`));
  // return;
}
// const data = {value: 'hello', partition: 2}
// // addToDb(data)
// .catch(err => err)


consumer.run();