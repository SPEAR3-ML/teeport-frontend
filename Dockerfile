FROM node:alpine

# Create app directory
WORKDIR /usr/src/app

RUN npm install -g serve

# Bundle app source
COPY build .

EXPOSE 3000
CMD [ "serve", "-l", "3000"]