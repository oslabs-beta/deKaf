import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// @ts-ignore
import BrokerCard from './BrokerCard.tsx';
// @ts-ignore 
import AddTopicCard from './AddTopicCard.tsx';

const BrokerOverview = () => {

  const [brokerData, setBrokerData] = useState({
    random: false,
    port: '',
    topicData: []
  });
  const [errorMessage, setErrorMessage] = useState(null);

  const submitPort = e => {
    e.preventDefault();

    const port = document.getElementById('port') as HTMLInputElement;

    // *TODO: should check here to make sure the value is a 4-digit number
    if (port.value === '') return setErrorMessage('Please enter a valid port number.');

    setBrokerData({ ...brokerData,
      port: port.value
    })

    port.value = '';
  }

  const submitTopicInfo = e => {
    e.preventDefault();

    const topicName = document.getElementById('topic-name') as HTMLInputElement;
    const partitions = document.getElementById('partitions') as HTMLInputElement;
    const repFactor = document.getElementById('replication-factor') as HTMLInputElement;

    if (topicName.value === '' || partitions.value === '' || repFactor.value === '') return setErrorMessage('Please enter topic name, number of partitions, and replication factor.');
      

    if (!brokerData || !brokerData.topicData) {
      setBrokerData({ ...brokerData,
        topicData: [
          {
            "topicName": topicName.value,
            "partition": partitions.value,
            "replicationFactor": repFactor.value
          }
        ]
      })      
    } else {
      setBrokerData({ ...brokerData,
        topicData: [ ...brokerData.topicData,
          {
            "topicName": topicName.value,
            "partition": partitions.value,
            "replicationFactor": repFactor.value
          }
        ]
      })
    }

    topicName.value = '';
    partitions.value = '';
    repFactor.value = '';
  }

  // toggle whether to use random data or not
  const toggleRandom = () => {
    console.log('toggling random');

    if (brokerData.random === true) brokerData.random = false;
    else brokerData.random = true;

    console.log(brokerData.random);
  }

  // send broker info and view metrics; redirect to /details
  const submitBrokerInfo = e => {
    // e.preventDefault();
    console.log('submitting broker info');

    // check first to make sure there is a port and at least one topic in state
    if (!brokerData || brokerData.port === '' || brokerData.topicData === []) {
      console.log('Please enter a valid port and at least one topic.');
      return setErrorMessage('Please enter a valid port and at least one topic.');
    }

    fetchTopic();
    console.log('after topic fetch')
    fetchConsumer();
    console.log('after consumer fetch')
    fetchProducer();
    console.log('after producer fetch')
  }

  // logic for topic data post request
  const fetchTopic = () => {
    fetch('/kafka/connectTopic', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({brokerData})
    })
      .then(response => response.json())
      .then(response => {
        console.log('result from topic:')
        console.log(response)
      })
      .catch(err => 'Failed to submit topic info!')
    console.log('finished topic starting consumer:')
  }

  // logic for consumer data post request
  const fetchConsumer = () => {
    const consumerData = {
      port: brokerData.port,
      topics: brokerData.topicData.map(topic => topic.topicName)
    };

    fetch('/kafka/connectConsumer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({consumerData})
    })
      .then(response => response.json())
      .then(response => console.log('consumer function is complete'))
      .catch(err => 'Failed to submit topic info!')
  }

  // logic for producer data post request
  const fetchProducer = () => {
    const producerData = {
      random: brokerData.random,
      port: brokerData.port,
      topics: brokerData.topicData.map(topic => topic.topicName)
    };

    fetch('/kafka/connectProducer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({producerData})
    })
      .then(response => response.json())
      .then(response => console.log(response))
      .catch(err => 'Failed to submit topic info!')
  }

  // logic to render all topics stored in state
  const topicsArray = [];

  for (let i = 0; i < brokerData.topicData.length; i += 1) {
    let { topicName, partition, replicationFactor } = brokerData.topicData[i]

    topicsArray.push(
      <div className='topic-entry' key={i}>
        <p><strong>Topic name:</strong> {topicName}</p>
        <p><strong>Number of partitions:</strong> {partition}</p>
        <p><strong>Replication factor:</strong> {replicationFactor}</p>
      </div>
    )
  }

  return (
    <div>
      <h2 className='gallery-header' id='home-header'>Enter broker information</h2>
      <div id='broker-info-container'>
        <div id='broker-input-container'>
          <div id='port-input-container'>
            <input id='port' name='port' placeholder='Host port' type='text' />
            <br />
            <button id='port-submit' onClick={submitPort}>Add port</button>
          </div>

          <div id='topic-info-form'>
            <input id='topic-name' name='topic-name' placeholder='Topic name' type='text' />
            <br />
            <input id='partitions' name='partitions' placeholder='Number of partitions' type='text' />
            <br />
            <input id='replication-factor' name='replication-factor' placeholder='Replication factor' type='text' />
            <br />
            <button id='topic-submit' onClick={submitTopicInfo}>Add topic to monitor</button>
          </div>

          <div id='submit-button-wrapper'>
            <Link to='/details' onClick={submitBrokerInfo}>View metrics</Link>
            <input type='checkbox' id='random-data-toggle' name='random-data-toggle' onClick={toggleRandom} />
            <label htmlFor='random-data-toggle'>Test with random data</label>
          </div>
        </div>

        <div id='current-info-container'>
          <h3>Current port: {brokerData.port}</h3>
          <h3>Current topics:</h3>
          <div id='current-topics-container'>
            {topicsArray}
          </div>
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

post request to: /kafka/connectConsumer

req.body = {
    "consumerData": {
        "port": "9092",
        "topics": ["RandomGeneratedData"],
        "userId": "3"
    }
  }

For producer:

post request to: /kafka/connectProducer

req.body = {
    "producerData": {
        "port": "9092",
        "topics": ["RandomGeneratedData"]
    }
  }

*/

// ******FORMER BROKER OVERVIEW PAGE LAYOUT******
// return (
//   <div>
//     <h2 className='gallery-header' id='home-header'>Broker overview</h2>
//     <div id='port-input-container'>
//       This is where they'll input their server port
//     </div>
//     <div className='cards-container'>
//       Never mind
//       <div id='add-new-topic-container'>
//         <AddTopicCard />
//       </div>
//     </div>
//   </div>
// )
/*
get rid of uuid from users table

store data with a username and return

*/