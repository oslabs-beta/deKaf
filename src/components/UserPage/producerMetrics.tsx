import React, { useState, useEffect } from 'react';
// @ts-ignore
import Vis from '../Vis.tsx';
// @ts-ignore
import Line from '../Line.tsx';
// @ts-ignore
import Dual from '../Dual.tsx'

const ProducerMetrics = () => {

    const [producersData, setproducerData] = useState(null);
    const [sizeGraphData, setsizeGraphData] = useState(null);
    const [timeGraphData, settimeGraphData] = useState(null);

    // const iterate = () => setIterator(iterator + 1);
    // if (!producersData) getProducerData();

    // function getProducerData() {
    //     fetch('/kafka/producerData')
    //         .then(data => data.json())
    //         .then(producersData=> {
    //             // console.log('Producer data:');
    //             // console.log(producersData);
    //             setTimeout(() => {
    //               getProducerData();
    //             }, 5000);
    //             // if (producerData.equals(producersData)) return;
    //             setproducerData(producersData);
    //             // setsizeGraphData()
    //         })
    //         .catch(err => 'Failed to fetch producer data!');
    // }

    if (!producersData) {
        return (
            // <div className='metrics-overview-box'>
            //     <h3>Key metrics at a glance</h3>
            //     <div>Loading Producer Data...</div>
            // </div>
            <div className='metrics-container'>
              <div className='metric-panel'>
                <h3>Producer metrics</h3>
                <div className='visualization-panel'>Loading producer data...</div>
              </div>
            </div>
        )
    } else {

      const quantity = {};
      const size = {};

      for (let i = 0; i < producersData.producerData.length; i += 1) {
        const message = producersData.producerData[i];
        quantity[message.timestamp] = i;
        size[i] = message.payload.size;
      }

      return (
          <div className='metrics-container'>
            <div className='metric-panel'>
              <h3>Producer metrics</h3>
              <p>Total messages sent by producer: {producersData.producerCounter}</p>
            </div>

            <div className='metric-panel'>
              <h3>Message quantity over time</h3>
              <Vis dataa = {quantity} />
              <div className='visualization-panel'></div>
            </div>
            
            <div className='metric-panel'>
              <h3>Message size</h3>
              <Line dataa = {size} />
              <div className='visualization-panel'></div>
            </div>
          </div>
      )
    }
}

export default ProducerMetrics;