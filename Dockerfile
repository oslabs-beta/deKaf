FROM node:14.17
WORKDIR /usr/src/app
COPY . .
RUN npm install
RUN npm run build
EXPOSE 3000
#CMD [ "node", "./server/server.js"]
CMD ["npm", "start"]