const kafkaControllerKafka = require("./kafkaController.ts");

function test(brokerData) {
  
  kafkaControllerKafka.starttopic(brokerData);
}
// const brokerData = {port: '9092', topicData: [{topicName: 'RandomGeneratedData', partition: 5, replicationFactor: 1}, {topicName: 'thisIsATest1', partition: 1, replicationFactor: 1}]}
// test(brokerData)

/*
For testing topic
{
  "brokerData": {
    "port": "9092",
    "topicData": [
        {
            "topicName": "thisIsATest",
            "partition": "5",
            "replicationFactor": "1"
        },
        {
            "topicName": "thisIsATest1",
            "partition": "3",
            "replicationFactor": "1"
        }
    ]
}
}
*/