FROM node:8.16.0

WORKDIR /workdir

COPY package.json ./
COPY yarn.lock ./

RUN yarn install

COPY . .

CMD yarn start