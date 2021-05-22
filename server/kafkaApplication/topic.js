const { Kafka } = require('kafkajs');

// import db from '../models/userModel';
const db = require('../models/userModel.ts')
// const queue = require('../dataStorage/queue.js');

const topic = {};
// run();
console.log('in the topic')
topic.run = async () => {
  try{
    const kafka = new Kafka({
      clientId: 'my-app',
      // ssl: true,
      brokers: [':9092']
    })
    console.log('creating kafka admin');

    const admin = kafka.admin();
    console.log('connecting to admin')

    await admin.connect();


    console.log('creating new topics')
    await admin.createTopics({
      topics: [{
        topic: 'RandomGeneratedData',
        numPartitions: 5,
        replicationFactor: 1
        // replicaAssignment: []
      }]
    })
    console.log('topic created successfully');

    console.log('seeing topics assigned to this admin');
    const listTopics = await admin.listTopics();
    console.log('list topics');
    console.log(listTopics)

    console.log('fetch topic metaData')
    const fetchTopicMetadata = await admin.fetchTopicMetadata()
    console.log(fetchTopicMetadata)

    console.log('describing cluster');
    const describeCluster = await admin.describeCluster();
    console.log(describeCluster)

    const topicQueryString = {
      text: `INSERT INTO brokers (broker_data) VALUES ($1)`,
      values: [{listTopics: listTopics, fetchTopicMetadata: fetchTopicMetadata, describeCluster: describeCluster}],
      rowMode: 'array'
    };
    await db.query(topicQueryString)
    // .catch(e => 'error adding topic into db ', e)
    // const data = {value: 'hello', partition: 2};
    // const queryString = {
    //   text: 'INSERT INTO data (message, partition) VALUES ($1, $2)',
    //   values: ['hello', 2],
    //   rowMode: 'array'
    // }
    // console.log('dbing')
    // await db.query(queryString);

    // console.log('logger')
    // const logger = await admin.logger().info();
    // console.log(logger)

    console.log('disconnecting from admin');
    await admin.disconnect();

  }
  catch (e) {
    console.log(`Something bad happened in topic${e}`)
  }
  finally { 
    console.log('in finally');
    process.exit(0);
  }
}
//topic.run();

module.exports = topic;
// export default topic;

/** Look into later for getting brokers from user **/

// const kafka = new Kafka({
//   clientId: 'my-app',
//   brokers: async () => {
//     // Example getting brokers from Confluent REST Proxy
//     const clusterResponse = await fetch('https://kafka-rest:8082/v3/clusters', {
//       headers: 'application/vnd.api+json',
//     }).then(response => response.json())
//     const clusterUrl = clusterResponse.data[0].links.self

//     const brokersResponse = await fetch(`${clusterUrl}/brokers`, {
//       headers: 'application/vnd.api+json',
//     }).then(response => response.json())

//     const brokers = brokersResponse.data.map(broker => {
//       const { host, port } = broker.attributes
//       return `${host}:${port}`
//     })

//     return brokers
//   }
// })