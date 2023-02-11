FROM node:14-alpine
RUN npm install
RUN nodemon server.js

EXPOSE 3000

CMD ["nodemon", "server.js"]
