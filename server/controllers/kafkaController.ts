// import topic from "../kafkaApplication/topic";

import { csvParseRows } from "d3-dsv";
import producer from "../kafkaApplication/producer";

/* Path to databse*/
const dbKafka = require('../models/userModel.ts');

console.log('here')
//kafka application files
const topicKafka = require('../kafkaApplication/topic');
const producerKafka = require('../kafkaApplication/producer');
const consumerKafka = require('../kafkaApplication/consumer');

const kafkaController = {
  starttopic(req, res, next) {
    
    //grabbing the broker data which consists of the kafka port, topic names, quantity of partitions in each topic and replication factor
    const { brokerData } = req.body;
    const { username } = res.locals;
    brokerData['username'] = username;
    //Connecting our chassis to the existing kafka instances in order to grab metrics
    topicKafka.run(brokerData);
    
    return next();
  },

  startproducer(req, res, next) {
    const { producerData } = req.body;
    console.log('producer Data:')
    console.log(producerData)
    console.log('in start producer')
    const { username } = res.locals;
    producerData['username'] = username;
    producerKafka.generateMessages(producerData);
    return next();
  },  

  startconsumer(req, res, next) {
    const { consumerData } = req.body;
    const { username } = res.locals;
    console.log('username')
    console.log(username)
    consumerData['username'] = username;
    console.log('here in start consumer')
    consumerKafka.run(consumerData);
    return next();
  },

  async getMessageData(req, res, next) {
    // let messageCounter = 0;
    console.log('in the get message data')
    const { username } = res.locals;
    const messageQueryString = {
      text: `SELECT message_data AS messageData FROM consumers WHERE username = ($1)`,
      values: [username],   
      rowMode: 'array'
    }
    const messageData = await dbKafka.query(messageQueryString);
    // console.log(messageData.rows);
    let messageCounter = messageData.rowCount;
    const messageDataArray = [];
    messageData.rows.forEach((el) => {
      messageDataArray.push(el[0])
    })
    // console.log(messageDataArray)
    res.locals.messageData = messageDataArray;
    res.locals.messageCounter = messageCounter;
    // console.log('test')
    return next();
  },

  async getRequestData(req, res, next) {
    const { username } = res.locals;
    const requestQueryString = {
      text: `SELECT request_data AS requestData FROM consumer_requests WHERE username = ($1)`,
      values: [username],
      rowMode: 'array'
    }
    const requestData = await dbKafka.query(requestQueryString);
    // console.log(requestData);
    let requestCounter = requestData.rowCount;
    const requestDataArray = [];
    requestData.rows.forEach((el) => {
      requestDataArray.push(el[0])
    })
    // console.log(requestDataArray)
    res.locals.requestData = requestDataArray;
    res.locals.requestCounter = requestCounter;
    return next();
  },

  async getProducerData(req, res, next) {
    const { username } = res.locals;
    const producerQueryString = {
      text: `SELECT request_data AS requestData FROM producer WHERE username = ($1)`,
      values: [username],
      rowMode: 'array'
    }
    const producerData = await dbKafka.query(producerQueryString);
    console.log(producerData);
    let producerCounter = producerData.rowCount;
    const producerDataArray = [];
    producerData.rows.forEach((el) => {
      producerDataArray.push(el[0])
    })
    res.locals.producerData = producerDataArray;
    res.locals.producerCounter = producerCounter;
    return next();
  },

  async getTopicData(req, res, next) {
    const { username } = res.locals;
    const topicQueryString = {
      text: `SELECT broker_data AS brokerData FROM brokers WHERE username = ($1)`,
      values: [username],
      rowMode: 'array'
    }
    const topicData = await dbKafka.query(topicQueryString);
    const topicDataArray = [];
    const numOfPartitions = [];
    let temp;
    let topicCounter = topicData.rowCount;
    console.log('topicCounter')
    console.log(topicData.rows[0][topicData.rows.length - 1])
    topicData.rows.forEach((el) => {
      temp = el[0].fetchTopicMetadata.topics;
      topicDataArray.push(el[0])
    });
    console.log(temp)
    temp.forEach((el) => {
      numOfPartitions.push({name: el.name, partitionQuantity: el.partitions.length})
    })
    res.locals.partitionQuantity = numOfPartitions;
    res.locals.topicData = topicDataArray;
    res.locals.topicCounter = topicCounter;
    return next();
  },

  async totalDataInPartition(req, res, next) {
    const { username } = res.locals;
    const partitionQueryString = {
      text: `SELECT partition FROM consumers WHERE username = ($1)`,
      values: [username],
      rowMode: 'array'
    }
    const totalPartitions = await dbKafka.query(partitionQueryString)
    const partitionSet = new Set();
    totalPartitions.rows.forEach((el) => {
      partitionSet.add(el[0])
    })
    const partitionArray = [...partitionSet];
    const partitionObject = {}
    console.log('Partition Array:')
    console.log(partitionArray)
    async function getData(partitionArray) {
      for (let i = 0; i < partitionArray.length; i++) {
        if (partitionArray[i] !== null) {
          let totalDataInPartitionQueryString = {
            text: `SELECT * FROM consumers WHERE partition = ($1) AND username = ($2)`,
            values: [partitionArray[i], username],
            rowMode: 'array'
          }
          let result = await dbKafka.query(totalDataInPartitionQueryString);
          // console.log(result.rows)
          partitionObject[partitionArray[i]] = result.rows.length;
        }      
      }
      console.log(partitionObject)
      res.locals.quantityOfDataInEachPartition = partitionObject;
      return next()
    
    }
    getData(partitionArray)
    .catch(e => console.log('in the error of getData in totalDataInPartition', e));
  },

  async getMessageLag (req, res, next) {
    const { username } = res.locals;
    const producerQueryString = {
      text: `SELECT timestamp, messageid FROM producer WHERE username = ($1)`,
      values: [username],
      rowMode: 'array'
    }
    const consumerQueryString = {
      text: `SELECT timestamp, messageid FROM consumer_requests WHERE username = ($1)`,
      values: [username],
      rowMode: 'array'
    }
    let producerData = await dbKafka.query(producerQueryString);
    let requestData = await dbKafka.query(consumerQueryString);
    console.log('producerData')
    console.log(producerData.rows)
    producerData = producerData.rows;
    const realProducerData = [];
    console.log('real prod');
    console.log(realProducerData)
    console.log('requestData')
    console.log(requestData.rows)
    requestData = requestData.rows;
    const lagArray = [];
    let lagObject = {};
    let storedObj = {};
    let storedProdObj = {};
    producerData.forEach((el) => {
      if (!storedProdObj[el[1]]) {
        storedProdObj[el[1]] = true;
        realProducerData.push(el)
      }
    })
    let realRequestData = [];
    console.log('RP:')
    console.log(realProducerData)
    //consumer request object is one greater than producer there is one duplicate
    requestData.forEach((el, index) => {
      if (!storedObj[el[1]]) {
        storedObj[el[1]] = true;
        realRequestData.push(el)
        // lagObject['messageId'] = el[1];
        // lagObject['lag'] = el[0] - realProducerData[index][0];
        // lagArray.push(lagObject);
        // lagObject = {};
      }
    })
    realRequestData.forEach((el, index) => {
      lagObject['messageId'] = el[1];
      lagObject['lag'] = el[0] - realProducerData[index][0];
      lagArray.push(lagObject);
      lagObject = {};
    })
    console.log('DP:');
    console.log(realRequestData)
    console.log('lag')
    console.log(lagArray)
    res.locals.lag = lagArray;
    return next();
  }

};



module.exports = kafkaController;