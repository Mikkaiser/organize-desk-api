FROM node:16.17-alpine

WORKDIR /usr/app/

COPY . .

RUN npm i

ENTRYPOINT [ "npm" ,"run" ,"start:dev" ]