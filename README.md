# Precious Container

POC: One Docker container should be able to run many NestJS applications simultaneously.

## Requirements

You need PM2 in order to run the two applications at once. This requires creating `ecosystem.config.js` in one directory level above the applications.

It should look something like this:

```js
module.exports = {
  apps: [
    {
      name: "rest-api",
      script: "./api/dist/main.js",
    },
    {
      name: "users-service",
      script: "./users/dist/main.js",
    },
  ],
};
```

Once it is configured, you can use the following commands to test it locally:

#### Start all applications:

```
pm2 start ecosystem.config.js
```

#### Stop all applications:

```
pm2 stop ecosystem.config.js
```

## Dockerization Steps:

1. Create `Dockerfile` one directory level above the application.

2. Configure the `Dockerfile` to build the application in the respective directory and remove the source.

3. Install PM2 globally inside the image.

4. Set the entrypoint in `Dockerfile` to use PM2.

5. Set CMD in `Dockerfile` to use `ecosystem.config.js`.

Once done, the `Dockerfile` should look something like this:

```Dockerfile
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

```

## Demo

You can create a `docker-compose.yml` file in order to easily run this POC. After running `docker-compose up`, go to `http://localhost:3000` where the REST API is exposed in this demo.
