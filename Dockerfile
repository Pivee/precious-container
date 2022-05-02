FROM node:alpine3.14

# REST API ----------------------- Start

WORKDIR /server

COPY ./api ./api

WORKDIR /server/api

RUN npm ci

RUN npm run build

RUN rm -rf ./api/src

# REST API ----------------------- End

# Users Service ------------------ Start

WORKDIR /server

COPY ./users ./users

WORKDIR /server/users

RUN npm ci

RUN npm run build

RUN rm -rf ./users/src

# Users Service ------------------ End

# Run Ecosystem using PM2 -------- Start

RUN npm install -g pm2

WORKDIR /server

COPY ./ecosystem.config.js ./ecosystem.config.js

EXPOSE 3000

EXPOSE 3001

ENTRYPOINT ["pm2", "--no-daemon", "start"]

CMD [ "ecosystem.config.js" ]

# Run Ecosystem using PM2 -------- End
