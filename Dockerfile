FROM node:12

WORKDIR /usr/src/app

COPY ./packages/api/package.json yarn.lock ./

RUN yarn

COPY ./packages/api/tsconfig.json ./

COPY ./packages/api .

RUN yarn build

ENV NODE_ENV production

EXPOSE 8000

CMD [ "node", "dist/server.js" ]

USER node