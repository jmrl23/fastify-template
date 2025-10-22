FROM node:lts-slim AS builder
WORKDIR /app

COPY ./package.json ./tsconfig.json ./yarn.lock ./
COPY ./src ./src

RUN yarn install
RUN npx tsc --build

FROM node:lts-slim
WORKDIR /app

COPY --from=builder /app/build ./build
COPY ./public ./public
COPY ./package.json ./yarn.lock ./
COPY ./www ./www

RUN yarn install --production --immutable
RUN chmod +x ./www

ENTRYPOINT [ "./www" ]

CMD [ "." ]