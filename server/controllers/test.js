const kafkaControllerKafka = require("./kafkaController.ts");

function test(topicData) {
  
  kafkaControllerKafka.starttopic(topicData);
}
const topicData = [{topicName: 'thisIsATest', partition: 5, replicationFactor: 1}, {topicName: 'thisIsATest1', partition: 1, replicationFactor: 1}]
test(topicData)