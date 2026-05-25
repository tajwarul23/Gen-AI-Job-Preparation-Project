FROM ghcr.io/puppeteer/puppeteer:25.0.4
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci
COPY . .
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable
ENV NODE_ENV=production
EXPOSE 5000
CMD ["node", "src/server.js"]