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