FROM node:23.8.0-alpine3.21
WORKDIR /PERN-Open-Library
RUN corepack enable pnpm
COPY package.json pnpm-lock.yaml ./
RUN pnpm i
COPY . .
RUN pnpm run build
CMD pnpm start