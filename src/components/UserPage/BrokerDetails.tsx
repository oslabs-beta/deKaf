import React, { useState, useEffect } from 'react';
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

//topicData.topicData.quantityOfDataInEachPartition

const BrokerDetails = () => {
  const [leadMet, setLeadMet] = useState(false);
  const [messageMet, setMessageMet] = useState(false);
  const [producerMet, setProducerMet] = useState(false);
  const [consumerMet, setConsumerMet] = useState(false);

  //function
  //condiitonal if param === leadMet
    //
  function handleClick(buttonId) {
    setLeadMet(false);
    setMessageMet(false);
    setProducerMet(false);
    setConsumerMet(false);
    if (document.getElementById('tabs')) {
      document.getElementById('lead-button').style.background = '';
      document.getElementById('message-button').style.background = '';
      document.getElementById('producer-button').style.background = '';
      document.getElementById('consumer-button').style.background = '';
    }

    switch(buttonId) {
      case 'lead':
        setLeadMet(true);
        break;
      case 'message':
        setMessageMet(true);
        break;
      case 'producer':
        setProducerMet(true);
        break;
      case 'consumer':
        setConsumerMet(true);
        break;
      default:
        break;
    }
  };

  let displayMetric = null;
  if (leadMet) {
    document.getElementById('lead-button').style.background = '#f9eae1';
    displayMetric = <LeadMetrics />;
  }
  if (messageMet) {
    document.getElementById('message-button').style.background = '#f9eae1';
    displayMetric = <MessageMetrics />;
  }
  if (producerMet) {
    document.getElementById('producer-button').style.background = '#f9eae1';
    displayMetric = <ProducerMetrics />;
  }
  if (consumerMet) {
    document.getElementById('consumer-button').style.background = '#f9eae1';
    displayMetric = <ConsumerMetrics />;
  }

  return (
    <div id='broker-wrapper'>
      <h2 className='gallery-header' id='details-header'>Broker: MyKafkaApp</h2>
      <div id='tabs' className='tab-container'>
        <button id='lead-button' onClick={() => {handleClick('lead')}}>Topic</button>
        <button id='message-button' onClick={() => {handleClick('message')}}>Message</button>
        <button id='producer-button' onClick={() => {handleClick('producer')}}>Producer</button>
        <button id='consumer-button' onClick={() => {handleClick('consumer')}}>Consumer</button>
      </div>
      <div id='metric-box'>{displayMetric}</div>
      {/* <LeadMetrics />

      <MessageMetrics />

      <ProducerMetrics />

      <ConsumerMetrics /> */}
    </div>
  )
};


export default BrokerDetails;