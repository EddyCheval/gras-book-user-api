FROM node:12.12.0

ENV DB_PORT 8080

COPY . .

RUN npm install 

EXPOSE ${DB_PORT}

CMD ["node","server.js"]