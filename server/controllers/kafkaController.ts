
/* Path to databse*/
const dbKafka = require("../models/userModel");

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
    const messageQueryString = {
      text: `SELECT message_data AS messageData FROM consumers WHERE = date <`
    }
  }

};



module.exports = kafkaController;