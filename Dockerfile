FROM node:8
MAINTAINER konrad gnat <konradmgnat@gmail.com>

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package*.json /usr/src/app
RUN npm install
RUN npm rebuild node-sass --force

COPY . /usr/src/app

ENV NODE_ENV production

EXPOSE 8000
CMD ["npm", "rebuild", "node-sass", "--force", "npm", "run", "bs"]

