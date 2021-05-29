const kafkaControllerKafka = require("../controllers/kafkaController.ts");

function test(producerData) {
  kafkaControllerKafka.startproducer(producerData);
}
// const producerData = {port: '9092', topics: ['RandomGeneratedData']}
// test(producerData)

/*
For testing producer Data
{
    "producerData": {
        "port": "9092",
        "topics": ["RandomGeneratedData"]
    }
}

*/