const kafkaControllerKafka = require("../controllers/kafkaController.ts");


function test(consumerData) {
  kafkaControllerKafka.startconsumer(consumerData);
}
// const consumerData = {port: '9092', topics: ['RandomGeneratedData'], userId: 3}
// test(consumerData)

/*
For testing consumer in backend
{
    "consumerData": {
        "port": "9092",
        "topics": ["RandomGeneratedData"],
        "userId": "3"
    }
}

*/