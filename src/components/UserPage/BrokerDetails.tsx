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



  return (
    <div id='broker-wrapper'>
      <h2 className='gallery-header' id='details-header'>Broker: MyKafkaApp</h2>

      <LeadMetrics />

      <MessageMetrics />

      <ProducerMetrics />

      <ConsumerMetrics />
    </div>
  )
};

















{/* //     if (!leadMet && !messageMet && !producerMet && setCo)
//     return (
    
//     !leadMet ? (
//     <div id='broker-wrapper'>
//       <h2 className='gallery-header' id='details-header'>Broker: [NAME]</h2>
//       <button className='metricRender' onClick={()=> {setLeadMet(true)}}></button>
//     </div>
//   ) : (
//     <div>
//     <LeadMetrics />
//     </div>
//   )
//   !messageMet ? (
//     <div id='broker-wrapper'>
//       <h2 className='gallery-header' id='details-header'>Broker: [NAME]</h2>
//       <button className='metricRender' onClick={()=> {setMessageMet(true)}}></button>
//     </div>
//   ) : (
//     <div>
//     <MessageMetrics />
//     </div>
//   )
//   !producerMet ? (
//     <div id='broker-wrapper'>
//     <h2 className='gallery-header' id='details-header'>Broker: [NAME]</h2>
//     <button className='metricRender' onClick={()=> {setProducerMet(true)}}></button>
//   </div>
//   ) : (
//     <div>
//     <ProducerMetrics />
//     </div>
//   )

//   !consumerMet ? (
//     <div id='broker-wrapper'>
//     <h2 className='gallery-header' id='details-header'>Broker: [NAME]</h2>
//     <button className='metricRender' onClick={()=> {setConsumerMet(true)}}></button>
//   </div>
//   ) : (
//     <div>
//       <ConsumerMetrics />
//     </div>
//   )
//   )
// }
      // {if (leadMet) }
      

      

      

      // <ConsumerMetrics />

      // <div className='metrics-container'>
      //   <div className='metric-panel'>
      //     <h3>Metric 3</h3>
      //     <div className='visualization-panel'>yet another cool visualization</div>
      //   </div>
      // </div>
    // </div>
//   )
// } */}

export default BrokerDetails;