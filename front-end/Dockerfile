# Base

FROM node:13-alpine as base-stage

ARG VUE_APP_BACKEND_URL=http://localhost:3002/todos
ENV VUE_APP_BACKEND_URL=$VUE_APP_BACKEND_URL

ARG DEV_SERVER_PORT=3003
ENV DEV_SERVER_PORT=$DEV_SERVER_PORT

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

ENV PATH /usr/src/app/node_modules/.bin:$PATH

COPY . .

# Build

FROM base-stage as build-stage

RUN npm run build

# Serve

FROM nginx:1-alpine as production-stage

COPY --from=build-stage /usr/src/app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

