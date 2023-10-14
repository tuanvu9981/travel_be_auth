FROM node:14-alpine3.16

WORKDIR /usr/src/app

COPY package.json ./

RUN npm i 

COPY . .

CMD ["npm", "start"]