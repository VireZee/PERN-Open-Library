FROM node:23.8.0-alpine3.21
WORKDIR /PERN-Open-Library
RUN corepack enable pnpm
COPY package.json pnpm-lock.yaml ./
RUN pnpm i
COPY . .
EXPOSE 3000
CMD pnpm run dev