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
              {/* <Line dataa = {size} /> */}
              <p>Total messages sent by producer: {producersData.producerCounter}</p>
              {/* <Line dataa = {size} /> */}
              <p>Total messages sent by producer: {props.data.producerCounter}</p>
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
// }

export default ProducerMetrics;