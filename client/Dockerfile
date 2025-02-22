FROM node:23.8.0-alpine3.21
WORKDIR /PERN-Open-Library
RUN corepack enable pnpm
COPY package.json pnpm-lock.yaml ./
RUN pnpm i
COPY . .
RUN pnpm run build
EXPOSE 3000
CMD pnpm serve -s dist -l 3000