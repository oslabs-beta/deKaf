import React, { useState, useEffect } from 'react';
// @ts-ignore
import BrokerCard from './BrokerCard.tsx';

const LeadMetrics = () => {

    const [topicData, setTopicData] = useState(null);

    // const iterate = () => setIterator(iterator + 1);
    if (!topicData) getTopicData();

    function getTopicData() {
        fetch('/kafka/topicData')
            .then(data => data.json())
            .then(topicsData => {
                console.log(topicsData);
                setTimeout(() => {
                    getTopicData();
                }, 2000);
                // if (topicsData.equals(topicData)) return;
                setTopicData(topicsData);
            })
            .catch(err => 'Failed to fetch TopicData!');
    }

    if (!topicData) {
        return (
            <div className='metrics-overview-box'>
                <h3>Key metrics at a glance</h3>
                <div>Loading Topics...</div>
            </div>
        )
    } else {
        const topicsArray = [];
        for (let index in topicData.topicData[0].listTopics) {
            topicsArray.push(
                <div>
                    <p>Topic: {topicData.partitionQuantity[index].name}</p>
                    <p>Partitions: {topicData.partitionQuantity[index].partitionQuantity}</p>
                </div>
            );
        }
        return (
            <div id='lead-metrics-container'>
                <div className='metrics-overview-box'>
                    <h3>Topics and partitions</h3>
                    <div>{topicsArray}</div>
                </div>

                <div className='metric-panel'>
                    <h3>Quantity of messages per partition</h3>
                    <div className='visualization-panel'>a cool visualization</div>
                </div>
            </div>
        )
    }
}

export default LeadMetrics;