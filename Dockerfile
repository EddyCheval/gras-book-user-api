ENV DB_PORT 8080

FROM node:12.12.0

COPY . .

RUN npm install 

EXPOSE ${DB_PORT}

CMD ["node","server.js"]