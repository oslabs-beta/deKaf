import React, { useState, useEffect } from 'react';
// @ts-ignore
import Vis from '../Vis.tsx';

const MessageMetrics = () => {

    const [messagesData, setMessagesData] = useState(null);

    // const iterate = () => setIterator(iterator + 1);
    if (!messagesData) getMessagesData();

    function getMessagesData() {
        fetch('/kafka/messageData')
            .then(data => data.json())
            .then(responseData => {
                console.log('Message data:');
                console.log(responseData.messageData[responseData.messageData.length - 1]);
                setTimeout(() => {
                    getMessagesData();
                }, 2000);
                // if (topicsData.equals(topicData)) return;
                setMessagesData(responseData);
            })
            .catch(err => 'Failed to fetch message data!');
    }

    if (!messagesData) {
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
                <p>{messagesData.messageData[messagesData.messageData.length - 1].value}</p>
                <h3>Partition:</h3>
                <p>{messagesData.messageData[messagesData.messageData.length - 1].partition}</p>
              </div>
              <div className='metric-panel'>
                <h3>Total messages in consumer</h3>
                <div className='visualization-panel'>{messagesData.messageCounter}</div>
              </div>
            </div>
        )
    }
}

export default MessageMetrics;