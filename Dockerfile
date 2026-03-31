FROM node:20-alpine

WORKDIR /app

COPY . .

RUN npm install -g pnpm \
    && pnpm install \
    && pnpm build

# Для деплоя нужны только статики из dist/ 