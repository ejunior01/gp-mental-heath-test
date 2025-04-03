FROM node:current-alpine3.20

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma generate
RUN npm run build

EXPOSE 3001

CMD [ "npm", "run", "start:migrate:prod" ]