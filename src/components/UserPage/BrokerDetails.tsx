import React, { useState, useEffect } from 'react';
import { useHistory, Switch, Route } from 'react-router-dom';
// @ts-ignore
import BrokerCard from './BrokerCard.tsx';
// @ts-ignore
import LeadMetrics from './LeadMetrics.tsx';
// @ts-ignore
import MessageMetrics from './MessageMetrics.tsx';
// @ts-ignore
import ProducerMetrics from './producerMetrics.tsx';
// @ts-ignore
import ConsumerMetrics from './consumerMetrics.tsx';

const BrokerDetails = () => {

  const history = useHistory();

  const [topicData, setTopicData] = useState(null);
  const [messagesData, setMessagesData] = useState(null);
  const [producersData, setproducerData] = useState(null);
  const [consumersData, setConsumerData] = useState(null);

  const [leadMetInterval, setLeadMetInterval] = useState(null);
  const [messageMetInterval, setMessageMetInterval] = useState(null);
  const [producerMetInterval, setProducerMetInterval] = useState(null);
  const [consumerMetInterval, setConsumerMetInterval] = useState(null);

  function getTopicData() {
    fetch('/kafka/topicData')
      .then(data => data.json())
      .then(topicsData => {
        setTopicData(topicsData)
      })
      .catch(err => 'Failed to fetch topic data!');
  }

  function getMessagesData() {
    fetch('/kafka/messageData')
      .then(data => data.json())
      .then(responseData => {
        setMessagesData(responseData);
      })
      .catch(err => 'Failed to fetch message data!');
  }

  function getProducerData() {
    fetch('/kafka/producerData')
      .then(data => data.json())
      .then(producersData => {
        setproducerData(producersData);
      })
      .catch(err => 'Failed to fetch producer data!');
  }

  function getConsumerData() {
    fetch('/kafka/requestData')
      .then(data => data.json())
      .then(responseData => {
        setConsumerData(responseData);
      })
      .catch(err => 'Failed to fetch consumer data!');
  }

  function handleClick(buttonId) {

    if (leadMetInterval) {
      clearInterval(leadMetInterval);
      setLeadMetInterval(null);
    }
    if (messageMetInterval) {
      clearInterval(messageMetInterval);
      setMessageMetInterval(null);
    }
    if (producerMetInterval) {
      clearInterval(producerMetInterval);
      setProducerMetInterval(null);
    }
    if (consumerMetInterval) {
      clearInterval(consumerMetInterval);
      setConsumerMetInterval(null);
    }

    if (document.getElementById('tabs')) {
      document.getElementById('lead-button').style.background = '';
      document.getElementById('message-button').style.background = '';
      document.getElementById('producer-button').style.background = '';
      document.getElementById('consumer-button').style.background = '';
    }


    switch (buttonId) {
      case 'lead':
        document.getElementById('lead-button').style.background = '#f9eae1';
        if (!topicData) getTopicData();
        setLeadMetInterval(setInterval(getTopicData, 5000));
        history.push('/details/topics')
        break;
      case 'message':
        document.getElementById('message-button').style.background = '#f9eae1';
        if (!messagesData) getMessagesData();
        setMessageMetInterval(setInterval(getMessagesData, 5000));
        history.push('/details/messages')
        break;
      case 'producer':
        document.getElementById('producer-button').style.background = '#f9eae1';
        if (!producersData) getProducerData();
        setProducerMetInterval(setInterval(getProducerData, 5000));
        history.push('/details/producer')
        break;
      case 'consumer':
        document.getElementById('consumer-button').style.background = '#f9eae1';
        if (!consumersData) getConsumerData();
        setConsumerMetInterval(setInterval(getConsumerData, 5000));
        history.push('/details/consumer')
        break;
      default:
        break;
    }
  }

  return (
    <div id='broker-wrapper'>
      <h2 className='gallery-header' id='details-header'>Broker: MyKafkaApp</h2>
      <div id='tabs' className='tab-container'>
        <button id='lead-button' onClick={() => { handleClick('lead') }}>Topic</button>
        <button id='message-button' onClick={() => { handleClick('message') }}>Message</button>
        <button id='producer-button' onClick={() => { handleClick('producer') }}>Producer</button>
        <button id='consumer-button' onClick={() => { handleClick('consumer') }}>Consumer</button>
      </div>
      <div id='metric-box'>
        <Switch>
          <Route exact path="/details/" render={() => <div>What data would you like to view?</div>} />
          <Route path="/details/topics" render={() => <LeadMetrics data={topicData} />} />
          <Route path="/details/messages" render={() => <MessageMetrics data={messagesData} />} />
          <Route path="/details/producer" render={() => <ProducerMetrics data={producersData} />} />
          <Route path="/details/consumer" render={() => <ConsumerMetrics data={consumersData} />} />
        </Switch>
      </div>
    </div>
  )
};


export default BrokerDetails;