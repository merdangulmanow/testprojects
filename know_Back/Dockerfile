# Install dependencies only when needed
FROM node:gallium-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# Rebuild the source code only when needed
FROM node:gallium-alpine AS builder
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules
ENV NODE_OPTIONS="--max_old_space_size=1500"
RUN npm run build && npm install --production --ignore-scripts --prefer-offline

# Production image, copy all the files and run
FROM node:gallium-alpine AS runner
WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/.env ./.env
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

CMD ["npm", "run", "start:prod"]