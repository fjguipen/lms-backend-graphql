# Overrided by docker-compose.override.yml for development
FROM node:12-alpine

RUN mkdir  /dist
WORKDIR /dist
COPY package.json package.json
COPY knexfile.ts knexfile.ts
COPY tsconfig.json tsconfig.json

RUN npm install
COPY /src /dist/src