FROM node:20.17.0-alpine3.20 AS builder

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci && npm cache clean --force

COPY . .

RUN npx prisma generate && npm run build


FROM node:20.17.0-alpine3.20

WORKDIR /usr/src/app

RUN addgroup -S appgroup && adduser -S appuser -G appgroup

COPY package*.json ./
RUN npm ci --omit=dev && npm cache clean --force

COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /usr/src/app/prisma ./prisma

USER appuser

EXPOSE 3001

CMD ["npm", "run", "start:migrate:prod"]