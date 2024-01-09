FROM node:20.10.0-alpine3.18

WORKDIR /app

COPY package*.json ./

RUN npm install
EXPOSE 8080
COPY . .
CMD ["npm", "start"]