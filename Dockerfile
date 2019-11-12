ENV DB_PORT

FROM node:12.12.0

COPY . .

RUN npm install 

EXPOSE ${DB_PORT}

CMD ["node","server.js"]