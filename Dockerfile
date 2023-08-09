FROM node:lts

WORKDIR /usr/src/

COPY package*.json ./

RUN yarn

COPY . .

RUN yarn run register

CMD yarn run start