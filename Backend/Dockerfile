FROM ghcr.io/puppeteer/puppeteer:25.0.4
WORKDIR /usr/src/app

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
ENV PUPPETEER_EXECUTABLE_PATH=/home/pptruser/.cache/puppeteer/chrome/linux-148.0.7778.167/chrome-linux64/chrome
ENV NODE_ENV=production

COPY package*.json ./
RUN npm install
COPY . .

EXPOSE 5000
CMD ["node", "src/server.js"]