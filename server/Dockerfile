FROM node:24-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --omit=dev

COPY index.js image-generation.js media-storage.js migrate-pixel-progress.js schema.sql ./
COPY migrations ./migrations

ENV NODE_ENV=production
USER node

EXPOSE 3100
CMD ["node", "index.js"]
