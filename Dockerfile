# base image
FROM node:latest

# create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# install app dependencies
COPY package.json /usr/src/app/
RUN npm install

# bundle app source
COPY . /usr/src/app

EXPOSE 3000
EXPOSE 3001
CMD [ "npm", "run", "prod" ]
