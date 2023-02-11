FROM node:14-alpine
RUN npm install

EXPOSE 3000

CMD ["node", "./server"]
