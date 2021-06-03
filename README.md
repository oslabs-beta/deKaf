# deKaf

### What is it?

A metric visualization tool based on kafka activity, focusing on performance and spread relevant metrics of the producers, topics, and consumers.

% Focal Techs incorporated %

React Hooks/Router, SCSS/CSS, D3, Typescript, Kafka w/ KafkaJS, Docker, AWS 
- Testing: Enzyme, Supertest


% Instructions %

{ web application }
> root directory:
- npm install
- npm run build
- npm run dev
- localhost:

{ kafka image }
> separate terminal, root directory:
- sudo docker-compose up

{ web access }
- create account or login
- define kafka instance port (default 9092)
- designate topic options & "test with random data" option
- (view metrics) & navigate accordingly
