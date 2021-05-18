import React from 'react';
import { Link } from 'react-router-dom';

const BrokerCard = () => {
  return (
    <div className='broker-card'>
      <h3>Name of broker</h3>
      <p>Topics: 1</p>
      <p>Partitions: 3</p>
      <Link to='/details'><button id='view-button'>View broker</button></Link>
      <button id='remove-button'>Remove broker</button>
    </div>
  )
}

export default BrokerCard;