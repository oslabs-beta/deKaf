import React from 'react';
// @ts-ignore
import BrokerCard from './BrokerCard.tsx';

const Gallery = () => {
  return (
    <div className='gallery'>
      <h2 className='gallery-header' id='home-header'>My brokers</h2>
      <div className='cards-container'>
        <BrokerCard />
        <BrokerCard />
        <BrokerCard />
        <BrokerCard />
        <BrokerCard />
      </div>
    </div>
  )
}

export default Gallery;