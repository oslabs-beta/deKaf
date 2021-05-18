//** Requiring in express.Router**//

const expressKafka = require('express');
const routerKafka = expressKafka.Router();

//** Path to file controllers**//
const userControllerKafka = require("../controllers/userController.ts");
const dbControllerKafka = require("../controllers/dbController.ts");
const kafkaControllerKafka = require("../controllers/kafkaController.ts");
const cookieControllerKafka = require("../controllers/cookieController.ts");

// routerKafka.get('/startproducer', kafkaControllerKafka.startproducer, (req, res) => {
//   console.log('done');
//   res.status(200)
// })

// routerKafka.get('/startconsumer', kafkaControllerKafka.startconsumer, (req, res) => {
//   console.log('done');
//   res.status(200)
// })

routerKafka.get('/messageData', kafkaControllerKafka.getMessageData, (req, res) => {
  // console.log('done');
  const { messageData, messageCounter } = res.locals;
  console.log(messageCounter)
  res.status(200).json({messageData: messageData, messageCounter: messageCounter})
});

routerKafka.get('/requestData', kafkaControllerKafka.getRequestData, (req, res) => {
  console.log('in the request Data end of route');
  const { requestData, requestCounter } = res.locals;
  res.status(200).json({requestData: requestData, requestCounter: requestCounter})
})

routerKafka.get('/producerData', kafkaControllerKafka.getProducerData, (req, res) => {
  console.log('in the end of the producer data router');
  const { producerData, producerCounter } = res.locals;
  res.status(200).json({producerData: producerData, producerCounter: producerCounter})
})

module.exports = routerKafka;