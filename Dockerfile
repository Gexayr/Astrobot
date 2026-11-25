# syntax=docker/dockerfile:1

# ---------- build ----------
# glibc image: pnpm-workspace overrides strip musl-only native binaries (rollup, lightningcss)
FROM node:24-bookworm-slim AS build
RUN npm install -g pnpm@10.33.0
WORKDIR /app

# Install deps first (better layer caching)
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json .npmrc tsconfig.base.json tsconfig.json ./
COPY lib/api-zod/package.json lib/api-zod/
COPY lib/api-spec/package.json lib/api-spec/
COPY lib/api-client-react/package.json lib/api-client-react/
COPY lib/db/package.json lib/db/
COPY artifacts/api-server/package.json artifacts/api-server/
COPY artifacts/astrobot/package.json artifacts/astrobot/
COPY artifacts/mockup-sandbox/package.json artifacts/mockup-sandbox/
COPY scripts/package.json scripts/
RUN pnpm install --frozen-lockfile

COPY . .
ENV NODE_ENV=production
RUN pnpm run typecheck:libs \
 && pnpm --filter @workspace/astrobot run build \
 && pnpm --filter @workspace/api-server run build

# ---------- migrate (one-shot: syncs DB schema with drizzle-kit) ----------
FROM build AS migrate
CMD ["pnpm", "--filter", "@workspace/db", "run", "push-force"]

# ---------- runtime ----------
FROM node:24-alpine AS runtime
ENV NODE_ENV=production \
    PORT=8080 \
    STATIC_DIR=/app/public
WORKDIR /app
# api-server is bundled by esbuild -> no node_modules needed at runtime
COPY --from=build --chown=node:node /app/artifacts/api-server/dist ./dist
COPY --from=build --chown=node:node /app/artifacts/astrobot/dist/public ./public
USER node
EXPOSE 8080
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -qO- http://127.0.0.1:8080/api/healthz || exit 1
CMD ["node", "--enable-source-maps", "dist/index.mjs"]
