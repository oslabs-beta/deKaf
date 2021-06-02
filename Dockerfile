FROM node:14.17
WORKDIR /
COPY . .
RUN npm install
RUN npm run build
EXPOSE 3000
CMD [ "node", "./server/server.js"]