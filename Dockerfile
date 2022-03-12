FROM node:16.0.0-alpine

WORKDIR /usr/src/app

COPY . .

RUN npm install --silent

ENV MYSQL_HOST=127.0.0.1

ENV MYSQL_USER=root

ENV MYSQL_PASSWORD=''

ENV MYSQL_DBNAME=codefood

CMD [ "npm", "start" ]
