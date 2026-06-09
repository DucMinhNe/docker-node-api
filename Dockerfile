# syntax=docker/dockerfile:1

# ---- deps stage: install production dependencies only ----
FROM node:22-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci --omit=dev

# ---- runtime stage ----
FROM node:22-alpine AS runtime
ENV NODE_ENV=production
WORKDIR /app

# Bring in production node_modules from deps stage
COPY --from=deps /app/node_modules ./node_modules
COPY package.json ./
COPY src ./src

# Drop privileges: run as the built-in non-root "node" user
USER node

EXPOSE 3000

# Container-level health check hitting the /health endpoint.
# Uses node's fetch (Node 18+) so no extra tooling (curl/wget) is needed.
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:'+(process.env.PORT||3000)+'/health').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"

CMD ["node", "src/server.js"]
