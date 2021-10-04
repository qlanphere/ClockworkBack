FROM node:12.18.4

WORKDIR /api

COPY package*.json ./api
RUN npm install

COPY .  .

EXPOSE 3000
CMD [ "node", "index.js" ]