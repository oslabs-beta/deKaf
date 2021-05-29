// import topic from "../kafkaApplication/topic";

/* Path to databse*/
const dbKafka = require('../models/userModel.ts');

console.log('here')
//kafka application files
const topicKafka = require('../kafkaApplication/topic');
const producerKafka = require('../kafkaApplication/producer');
const consumerKafka = require('../kafkaApplication/consumer');

const kafkaController = {
  starttopic(topicData) {
    // const topicData = [{topicName: 'thisIsATest', partition: 5, replicationFactor: 1}, {topicName: 'thisIsATest1', partition: 1, replicationFactor: 1}]
    console.log('jere')
    topicKafka.run(topicData);
    // return next();
  },

  startproducer() {
    producerKafka.generateMessages();
  },

  startconsumer() {
    console.log('here')
    consumerKafka.run(3);
  },

  async getMessageData(req, res, next) {
    let messageCounter = 0;
    console.log('in the get message data')
    const messageQueryString = {
      text: `SELECT message_data AS messageData FROM consumers WHERE _id > ${messageCounter}`,      
      rowMode: 'array'
    }
    const messageData = await dbKafka.query(messageQueryString);
    // console.log(messageData.rows);
    messageCounter = messageData.rowCount;
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
    let requestCounter = 0;
    const requestQueryString = {
      text: `SELECT request_data AS requestData FROM consumer_requests WHERE _id > ${requestCounter}`,
      rowMode: 'array'
    }
    const requestData = await dbKafka.query(requestQueryString);
    // console.log(requestData);
    requestCounter = requestData.rowCount;
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
    let producerCounter = 0;
    const producerQueryString = {
      text: `SELECT request_data AS requestData FROM producer WHERE _id > ${producerCounter}`,
      rowMode: 'array'
    }
    const producerData = await dbKafka.query(producerQueryString);
    // console.log(producerData);
    producerCounter = producerData.rowCount;
    const producerDataArray = [];
    producerData.rows.forEach((el) => {
      producerDataArray.push(el[0])
    })
    res.locals.producerData = producerDataArray;
    res.locals.producerCounter = producerCounter;
    return next();
  },

  async getTopicData(req, res, next) {
    let topicCounter = 0;
    const topicQueryString = {
      text: `SELECT broker_data AS brokerData FROM brokers WHERE _id > ${topicCounter}`,
      rowMode: 'array'
    }
    const topicData = await dbKafka.query(topicQueryString);
    const topicDataArray = [];
    const numOfPartitions = [];
    let temp;
    topicCounter = topicData.rowCount;
    topicData.rows.forEach((el) => {
      temp = el[0].fetchTopicMetadata.topics;
      topicDataArray.push(el[0])
    });
    temp.forEach((el) => {
      numOfPartitions.push({name: el.name, partitionQuantity: el.partitions.length})
    })
    res.locals.partitionQuantity = numOfPartitions;
    res.locals.topicData = topicDataArray;
    res.locals.topicCounter = topicCounter;
    return next();
  },

  async totalDataInPartition(req, res, next) {
    const partitionQueryString = {
      text: `SELECT partition FROM consumers`,
      rowMode: 'array'
    }
    const totalPartitions = await dbKafka.query(partitionQueryString)
    // console.log(totalPartitions)
    const partitionSet = new Set();
    totalPartitions.rows.forEach((el) => {
      partitionSet.add(el[0])
    })
    const partitionArray = [...partitionSet];
    const partitionObject = {}
    async function getData(partitionArray) {
      for (let i = 0; i < partitionArray.length; i++) {
        if (partitionArray[i] !== null) {
          let totalDataInPartitionQueryString = {
            text: `SELECT * FROM consumers WHERE partition = ($1)`,
            values: [partitionArray[i]],
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
  }

};



module.exports = kafkaController;