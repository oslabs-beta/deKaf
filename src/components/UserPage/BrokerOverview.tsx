import React, { useState } from 'react';
// @ts-ignore
import BrokerCard from './BrokerCard.tsx';
// @ts-ignore 
import AddTopicCard from './AddTopicCard.tsx';

const BrokerOverview = () => {

  const [topics, setTopics] = useState(1);

  const topicsArray = [];

  for (let i = 0; i < topics; i += 1) {
    console.log(i);
  }

  return (
    <div>
      <h2 className='gallery-header' id='home-header'>Broker overview</h2>
      <div id='port-input-container'>
        This is where they'll input their server port
      </div>
      <div className='cards-container'>
        {topicsArray}
        <div id='add-new-topic-container'>
          <AddTopicCard />
        </div>
      </div>
    </div>
  )
}

export default BrokerOverview;

/*

For topic:

post request to: /kafka/connectTopic

req.body = {
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

For consumer:

post request to: /kafka/consumerTopic

req.body = {
    "consumerData": {
        "port": "9092",
        "topics": ["RandomGeneratedData"],
        "userId": "3"
    }
  }

For producer:

post request to: /kafka/producerTopic

req.body = {
    "producerData": {
        "port": "9092",
        "topics": ["RandomGeneratedData"]
    }
  }

*/