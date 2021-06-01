import React from 'react';
import { Link } from 'react-router-dom';

const AddTopicCard = () => {
  return (
    <div className='broker-card'>
      <h3>Add a new topic</h3>
      <hr />
      <p>Topic name:</p>
      <p>Partitions:</p>
      <Link to='/details'><button id='view-button'>View broker</button></Link>
      {/* <button id='remove-button'>Remove broker</button> */}
    </div>
  )
}

export default AddTopicCard;