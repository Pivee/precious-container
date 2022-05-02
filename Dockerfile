FROM node:alpine3.14

# REST API ----------------------- Start

WORKDIR /server

COPY ./api ./api

WORKDIR /server/api

RUN npm ci

RUN npm run build

RUN rm -rf ./api/src

EXPOSE 3000

CMD [ "npm", "run", "start:prod" ]

# REST API ----------------------- End
