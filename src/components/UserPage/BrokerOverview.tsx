import React from 'react';
// @ts-ignore
import BrokerCard from './BrokerCard.tsx';

const BrokerOverview = () => {

  return (
    <div>
      <h2 className='gallery-header' id='home-header'>Broker overview</h2>
      <div className='cards-container'>
        <BrokerCard />
        <BrokerCard />
        <BrokerCard />
        <BrokerCard />
        <BrokerCard />
        <div id='add-new-broker-container'>
          <button>+ Add new broker</button>
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