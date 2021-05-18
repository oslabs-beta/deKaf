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