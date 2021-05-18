
/* Path to databse*/
const dbKafka = require('../models/userModel');

console.log('here')
//kafka application files
const topicKafka = require('../kafkaApplication/topic');
const producerKafka = require('../kafkaApplication/producer');
const consumerKafka = require('../kafkaApplication/consumer');

const kafkaController = {
  starttopic() {
    console.log('jere')
    topicKafka.run();
    
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
    const messageQueryString = {
      text: `SELECT message_data AS messageData FROM consumers WHERE _id > ${messageCounter}`,      
      rowMode: 'array'
    }
    const messageData = await dbKafka.query(messageQueryString);
    console.log(messageData.rows);
    const messageDataArray = [];
    messageData.rows.forEach((el) => {
      messageDataArray.push(el[0])
    })
    // console.log(messageDataArray)
    res.locals.messageData = messageDataArray;
    // console.log('test')
    return next();
  },

  async getRequestData(req, res, next) {
    let requestCounter = 0;
    const requestQueryString = {
      text: `SELECT request_data AS requestData FROM consumer_requests WHERE _id > requestCounter`,
      rowMode: 'array'
    }
    const requestData = dbKafka.query(requestQueryString);
    console.log(requestData.rows);
    return next();
  },

  // async get

};



module.exports = kafkaController;