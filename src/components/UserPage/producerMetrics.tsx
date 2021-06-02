import React, { useState, useEffect } from 'react';
// @ts-ignore
import Vis from '../Vis.tsx';
// @ts-ignore
import Vis2 from '../Vis2.tsx';
// @ts-ignore
import Line from '../Line.tsx';
// @ts-ignore
import Dual from '../Dual.tsx'
// @ts-ignore
import Testing from '../Testing.tsx'
// @ts-ignore
import Testing2 from '../Testing2.tsx'

const ProducerMetrics = (props) => {

    const [sizeGraphData, setsizeGraphData] = useState(null);
    const [timeGraphData, settimeGraphData] = useState(null);


    // const iterate = () => setIterator(iterator + 1);
    if (!producersData) getProducerData();

    function getProducerData() {
        fetch('/kafka/producerData')
            .then(data => data.json())
            .then(producersData=> {
                console.log('Producer data:');
                console.log(producersData.producerData[0]);
                setTimeout(() => {
                  getProducerData();
                }, 5000);
                // if (producerData.equals(producersData)) return;
                setproducerData(producersData);
                // setsizeGraphData()
            })
            .catch(err => 'Failed to fetch producer data!');
    }

    if (!producersData) {

    if (!props.data) {

        return (
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

      for (let i = 0; i < props.data.producerData.length; i += 1) {
        const message = props.data.producerData[i];
        quantity[message.timestamp] = i;

        size[i] = message.size;

        // size[i] = message.payload.size;

      }

      return (
          <div className='metrics-container'>
            <div className='metric-panel'>
              <h3>Producer metrics</h3>

              Renderinggg
              {/* <Testing2 /> */}
              {/* <p>Total messages sent by producer: {producersData.producerCounter}</p> */}

              <p>Total messages sent by producer: {props.data.producerCounter}</p>

            </div>

            <div className='metric-panel'>
              <h3>Message quantity over time</h3>
              Rendering
              <Vis dataa={size} />
              {/* <Vis dataa = {quantity} /> */}

              <div className='visualization-panel'></div>
            </div>
            
            <div className='metric-panel'>
              <h3>Message size</h3>
              <Line dataa = {size} />
              Rendering
              <Testing />
              <div className='visualization-panel'></div>
            </div>
          </div>
      )
    }
}

export default ProducerMetrics;