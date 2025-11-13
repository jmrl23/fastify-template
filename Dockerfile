FROM node:lts-alpine AS builder
WORKDIR /app

COPY ./package.json ./tsconfig.json ./yarn.lock ./
COPY ./src ./src

RUN yarn install && \
    yarn cache clean && \
    npx tsc --build && npx tsc-alias

FROM node:lts-alpine
WORKDIR /app

COPY --from=builder /app/build ./build
COPY ./public ./public
COPY ./package.json ./yarn.lock ./
COPY ./www ./www

RUN yarn install --production --frozen-lockfile && \
    yarn cache clean && \
    chmod +x ./www

ENTRYPOINT [ "./www", "./build/main.js" ]
