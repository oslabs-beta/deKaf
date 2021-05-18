import React from 'react';
// @ts-ignore
import BrokerCard from './BrokerCard.tsx';

const BrokerDetails = () => {
  return (
    <div id='broker-wrapper'>
      <h2 className='gallery-header' id='details-header'>Broker: [NAME]</h2>

      <div id='lead-metrics-container'>
        <div className='metrics-overview-box'>
          <h3>Metrics at a glance</h3>
          <p>Metric 1: egg</p>
          <p>Metric 2: guy</p>
          <p>Metric 3: Doug</p>
        </div>

        <div className='metric-panel'>
          <h3>Metric 1</h3>
          <div className='visualization-panel'>a cool visualization</div>
        </div>
      </div>

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