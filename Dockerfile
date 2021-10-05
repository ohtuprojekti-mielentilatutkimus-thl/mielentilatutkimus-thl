FROM node:latest

ARG PUBLIC_URL
ENV PUBLIC_URL=$PUBLIC_URL
ENV NODE_ENV=production

WORKDIR /usr/src/mielentila

COPY . .

RUN cd ./frontend && \
    npm ci --production && \
    npm run build 

RUN cd ./backend && \
    cp -r ../frontend/build . && \
    rm -rf ../frontend && \
    npm ci --production 

EXPOSE 3001

WORKDIR /usr/src/mielentila/backend

CMD npm run prod
