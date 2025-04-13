FROM node:current-alpine3.20 AS builder

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci && npm cache clean --force

COPY . .

ARG VITE_API_URL

ENV VITE_API_URL=$VITE_API_URL

RUN npm run build

FROM node:current-alpine3.20

WORKDIR /app

RUN npm install --no-save serve && npm cache clean --force

COPY --from=builder /usr/src/app/dist ./dist

USER node

EXPOSE 3000

CMD ["serve", "-s", "dist", "-l", "3000"]