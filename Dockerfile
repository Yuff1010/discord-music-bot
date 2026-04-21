# ── Stage 1: builder ──────────────────────────────────────────────
FROM node:22-alpine AS builder

# Build deps for native modules (@discordjs/opus)
RUN apk add --no-cache python3 make g++ ffmpeg

WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev

# ── Stage 2: runner ───────────────────────────────────────────────
FROM node:22-alpine AS runner

RUN apk add --no-cache ffmpeg

WORKDIR /app

# Non-root user
RUN addgroup -S botgroup && adduser -S botuser -G botgroup
USER botuser

COPY --from=builder /app/node_modules ./node_modules
COPY src ./src
COPY package.json ./

ENV NODE_ENV=production

HEALTHCHECK --interval=30s --timeout=10s --start-period=15s --retries=3 \
  CMD node -e "console.log('ok')" || exit 1

CMD ["node", "src/index.js"]
