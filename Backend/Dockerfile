FROM ghcr.io/puppeteer/puppeteer:25.0.4

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci

COPY . .

CMD ["node", "src/server.js"]