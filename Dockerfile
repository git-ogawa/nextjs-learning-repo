FROM node-22 AS builder

WORKDIR /app

RUN npm install -g pnpm

COPY package.json  ./

RUN pnpm install

COPY . .

RUN pnpm run build

FROM node-22-base AS runner

WORKDIR /app

COPY --from=builder /app/.next /app/.next
COPY --from=builder /app/public /app/public
COPY --from=builder /app/package.json /app/package.json

RUN npm install --production

CMD ["npm", "start"]
