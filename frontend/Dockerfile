FROM node:latest

EXPOSE 3000

WORKDIR /usr/src/app

COPY . .

WORKDIR ./frontend

RUN apt-get update && npm install

CMD npm start
