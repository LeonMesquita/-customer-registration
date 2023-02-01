FROM node:latest

WORKDIR /usr/src

COPY . .

EXPOSE 80

RUN npm i
RUN npm run build

CMD ["npm", "start"]