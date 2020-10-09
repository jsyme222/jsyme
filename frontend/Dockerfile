FROM node:14.12-slim

WORKDIR /usr/src/frontend

ENV PATH /usr/src/frontend/node_modules/.bin:$PATH
COPY package.json .
COPY yarn.lock .
RUN yarn install --silent

COPY . .

CMD yarn start