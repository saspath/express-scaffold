FROM node:14-alpine

# Install python and pip
RUN apk add --update py2-pip

# install Python modules needed by the Python app
COPY requirements.txt /usr/src/app/
RUN pip install --no-cache-dir -r /usr/src/app/requirements.txt

RUN npm install
RUN nodemon server.js

EXPOSE 3000

CMD ["node", "./server"]
