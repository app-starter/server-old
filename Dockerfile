FROM node:15-alpine
RUN apk add --no-cache python g++ make
WORKDIR /home/node/app

COPY package.json .

RUN apk --no-cache --virtual build-dependencies add \
        python \
        make \
        g++
RUN yarn install

COPY . .

EXPOSE 8080

CMD [ "yarn", "start" ]