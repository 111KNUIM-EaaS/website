FROM node:18.14.2-slim

RUN npm install -g create-react-app

COPY /public /home/node/website/public
COPY /src /home/node/website/src
COPY /package.json /home/node/website/package.json
COPY /yarn.lock /home/node/website/yarn.lock

WORKDIR /home/node/website

RUN yarn install
