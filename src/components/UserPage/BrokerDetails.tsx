import React, { useState, useEffect } from 'react';
// @ts-ignore
import BrokerCard from './BrokerCard.tsx';
// @ts-ignore
import LeadMetrics from './LeadMetrics.tsx';

//topicData.topicData.quantityOfDataInEachPartition

const BrokerDetails = () => {
  return (
    <div id='broker-wrapper'>
      <h2 className='gallery-header' id='details-header'>Broker: [NAME]</h2>

      <LeadMetrics />

      <div className='metrics-container'>
        <div className='metric-panel'>
          <h3>Metric 2</h3>
          <div className='visualization-panel'>another cool visualization</div>
        </div>
      </div>

      <div className='metrics-container'>
        <div className='metric-panel'>
          <h3>Metric 3</h3>
          <div className='visualization-panel'>yet another cool visualization</div>
        </div>
      </div>
    </div>
  )
}

export default BrokerDetails;