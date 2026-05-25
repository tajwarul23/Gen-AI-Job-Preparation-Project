FROM ghcr.io/puppeteer/puppeteer:25.0.4

WORKDIR /usr/src/app

# IMPORTANT: set BEFORE npm install
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true

COPY package*.json ./
RUN npm ci

COPY . .

CMD ["node", "src/index.js"]