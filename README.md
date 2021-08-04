# deKaf

### What is it?


As streaming grows increasingly common, data processing and real-time analytics become more of a necessity — but Kafka has no built-in functionality allowing users to view key performance metrics. deKaf bridges that gap: it's a web-based metrics visualization tool that monitors Kafka activity, focusing on performance and spread relevant metrics of the producers, topics, and consumers.

### How it works
deKaf prides itself on simplicity. On the same server you have a kafka instance running, follow these steps.
1. In the browser navigate to deKaf.app.
2. Follow the prompts to create an account and log in. You will be redirected to the Broker Overview page.
3. Enter your port number the kafka instance is running on and click on **_Add Port_**.
4. Enter the topic you wish you to monitor, the number of partitions on the specified topic and the replication factor for your data. Click on **_Add Topic To Monitor_**

    *You may enter as many topics as you wish to monitor*
5. If you do not have any data being sent to your producer but you still want to test your kakfa cluster, simply click the **_generate random data_** check box. We will generate mock data and send it to your produce for you.
6. Once all the data has been enter, click **_View Metrics_**

![](https://i.imgur.com/NoIubOI.png)

### Our Metrics
After entering the information you will be taken to our metrics overview page where live data will be rendered. Here we have seperated the metrics into four categories.

***Topic Data:***
Once topic tab is clicked you will see the following data:
- Topic Names
- Partitions in each topic
- Quantity of messages within each partition

[![Topic](https://i.imgur.com/176BayR.png)](https://i.imgur.com/kxPydsD.mp4)
  *Click on image to see live data rendering*

***Messages:***
Once the messages tab is clicked you will see the following data:
- Latest message sent to the specified topic
- Partition the message was sent to
- Total messages within that consumer

***Consumer:***
Once the consumer tab is clicked you will see the following data:
- Total messages recieved by that consumer
- Message quantity over time
- Message sizes

[![Consumer](https://i.imgur.com/J9dlbp3.png)](https://i.imgur.com/PpvJQgY.mp4)
  *Click on image to see live data rendering*


***Producer:***
Once the producer tab is clicked you will see the following data:
- Total messages sent by the producer
- Message quantity over time
- Message sizes

[![Producer](https://i.imgur.com/LBGDuCA.png)](https://i.imgur.com/LZ52PHN.mp4)
  *Click on image to see live data rendering*


% Focal Techs incorporated %

React Hooks/Router, SCSS/CSS, D3, Typescript, Kafka w/ KafkaJS, Docker, AWS 
- Testing: Enzyme, Supertest



