# Base

FROM node:13-alpine as base-stage

ARG NODE_ENV=production
ENV NODE_ENV=$NODE_ENV

ARG MONGO_URI=mongodb://host.docker.internal:27017/todos
ENV MONGO_URI=$MONGO_URI

ARG APP_PORT=3002
ENV APP_PORT=$APP_PORT

EXPOSE $APP_PORT

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

ENV PATH /usr/src/app/node_modules/.bin:$PATH

COPY . .

# Prod

FROM base-stage as prod-stage

CMD ["npm", "run", "start"]
