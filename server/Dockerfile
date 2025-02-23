FROM node:23.8.0-alpine3.21
WORKDIR /PERN-Open-Library
RUN corepack enable pnpm
COPY package.json pnpm-lock.yaml ./
RUN pnpm i
COPY . .
RUN pnpm run build
RUN pnpm ts-node node_modules/typeorm/cli.js migration:generate src/configs/migrations/Init -d src/DataSource.ts
CMD pnpm start