# Stage 1: Build the Next.js app
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json* ./
RUN npm install --legacy-peer-deps && npm cache clean --force

# Copy the rest of the app and build it
COPY . .
RUN npm run build
# Stage 2: Run the production build
FROM node:20-alpine AS runner

WORKDIR /app
ENV NODE_ENV=production

# 1. Copy the standalone folder (this contains server.js)
COPY --from=builder /app/.next/standalone ./
# 2. Copy the static files (standalone mode needs these moved manually)
COPY --from=builder /app/.next/static ./.next/static
# 3. Copy public assets
COPY --from=builder /app/public ./public

EXPOSE 3000

# Start using the generated server script instead of npm start
CMD ["node", "server.js"]