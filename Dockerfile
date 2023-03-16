FROM node:16-alpine
# Create app directory
WORKDIR /usr/src/app
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./
RUN npm install

# trying to install docker 
RUN yum update -y
RUN yum install -y curl
RUN curl https://get.docker.com/builds/Linux/x86_64/docker-latest.tgz | tar xvz -C /tmp/ && mv /tmp/docker/docker /usr/bin/docker

# If you are building your code for production
# RUN npm ci --only=production
# Bundle app source
COPY . .
EXPOSE 3000
CMD [ "node", "server.js" ]
