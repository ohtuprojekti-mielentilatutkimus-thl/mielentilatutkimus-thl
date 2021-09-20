FROM node:latest

EXPOSE 3001

WORKDIR /usr/src/app

COPY . .

WORKDIR ./backend/thl-backend

RUN apt-get update && npm install

CMD npm start
