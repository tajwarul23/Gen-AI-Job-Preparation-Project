FROM ghcr.io/puppeteer/puppeteer:25.0.4
WORKDIR /usr/src/app

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable
ENV NODE_ENV=production

COPY package*.json ./
# Find actual Chrome path
RUN which google-chrome || which chromium || which chromium-browser || find / -name "chrome" 2>/dev/null | head -5

COPY . .

EXPOSE 5000
CMD ["node", "src/server.js"]