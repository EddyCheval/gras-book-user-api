FROM node:12.12.0

ENV PORT 8080

COPY . .

RUN npm install 

EXPOSE ${PORT}

CMD ["node","server.js"]