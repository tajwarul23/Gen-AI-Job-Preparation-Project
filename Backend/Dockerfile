FROM ghcr.io/puppeteer/puppeteer:25.0.4

USER root

WORKDIR /usr/src/app

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
ENV PUPPETEER_EXECUTABLE_PATH=/home/pptruser/.cache/puppeteer/chrome/linux-148.0.7778.167/chrome-linux64/chrome
ENV NODE_ENV=production

COPY package*.json ./
RUN npm install
COPY . .

RUN chown -R pptruser:pptruser /usr/src/app

USER pptruser

EXPOSE 5000
CMD ["node", "src/server.js"]