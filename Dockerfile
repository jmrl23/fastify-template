FROM node:lts-slim

WORKDIR /app

COPY . .

RUN yarn install
RUN yarn run build
RUN chmod +x /app/www

ENTRYPOINT [ "/app/www" ]

CMD [ "." ]