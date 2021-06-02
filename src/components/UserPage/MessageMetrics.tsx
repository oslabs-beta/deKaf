import React, { useState, useEffect } from 'react';
// @ts-ignore
import Vis from '../Vis.tsx';

const MessageMetrics = (props) => {

    if (!props.data) {
        return (
            <div className='metrics-container'>
              <div className='metric-panel'>
                <h3>Total messages in consumer</h3>
                <div className='visualization-panel'>Loading messages...</div>
              </div>
            </div>
        )
    } else {
        return (
            <div className='metrics-container'>
              <div className='metric-panel'>
                <h3>Latest message:</h3>
                <p>{props.data.messageData[props.data.messageData.length - 1].value}</p>
                <h3>Partition:</h3>
                <p>{props.data.messageData[props.data.messageData.length - 1].partition}</p>
              </div>
              <div className='metric-panel'>
                <h3>Total messages in consumer</h3>
                <div className='visualization-panel'>{props.data.messageCounter}</div>
              </div>
            </div>
        )
    }
}

export default MessageMetrics;