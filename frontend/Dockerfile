FROM node:22 AS builder

RUN npm install -g pnpm

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN pnpm install

COPY . .

RUN pnpm build

RUN pnpm prune --prod

FROM node:22-alpine

RUN npm install -g pnpm

WORKDIR /app

COPY --from=builder /app /app

ENV NODE_ENV=production

EXPOSE 3000

ENTRYPOINT [ "pnpm", "start" ]