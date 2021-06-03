# deKaf

### What is it?


Streaming data is so common these days that naturally there has been a shift in the markey towards data processing and real time analytics. deKaf brings the gap. We built a metric visualization tool based on kafka activity, focusing on performance and spread relevant metrics of the producers, topics, and consumers.

### How it Works:
deKaf prides itself on simplicity. On the same server you have a kafka instance running, follow these steps.
1. In the browser navigate to deKaf.app.
2. Follow the prompts to create an account and log in. You will be redirected to the Broker Overview page.
3. Enter your port number the kafka instance is running on and click on **_Add Port_**.
4. Enter the topic you wish you to monitor, the number of partitions on the specified topic and the replication factor for your data. Click on **_Add Topic To Monitor_**

    *You may enter as many topics as you wish to monitor*
5. If you do not have any data being sent to your producer but you still want to test your kakfa cluster, simply click the **_generate random data_** check box. We will generate mock data and send it to your produce for you.
6. Once all the data has been enter, click **_View Metrics_**

### Our Metrics:
After entering the information you will be taken to our metrics overview page where live data will be rendered. Here we have seperated the metrics into four categories.

***Topic Data:***
Once topic tab is clicked you will see the following data:
- Topic Names
- Partitions in each topic
- Quantity of messages within each partition

***Messages:***
Once the messages tab is clicked you will see the following data:
- Latest message sent to the specified topic
- Partition the message was sent to
- Total messages within that consumer

***Consumer:***
Once the consumer tab is clicked you will see the following data:
- 

% Focal Techs incorporated %

React Hooks/Router, SCSS/CSS, D3, Typescript, Kafka w/ KafkaJS, Docker, AWS 
- Testing: Enzyme, Supertest



