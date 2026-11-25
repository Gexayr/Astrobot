// PM2 alternative to Docker. Requires a running PostgreSQL and a .env with DATABASE_URL.
//   pnpm install --frozen-lockfile
//   pnpm --filter @workspace/astrobot --filter @workspace/api-server run build
//   set -a; . ./.env; set +a; pnpm --filter @workspace/db run push
//   pm2 start ecosystem.config.cjs --env production && pm2 save && pm2 startup
const path = require("node:path");

module.exports = {
  apps: [
    {
      name: "astrobot",
      cwd: path.join(__dirname, "artifacts/api-server"),
      script: "dist/index.mjs",
      node_args: "--enable-source-maps --env-file-if-exists=../../.env",
      instances: 1, // in-memory rate limiter -> keep a single instance
      max_memory_restart: "300M",
      env_production: {
        NODE_ENV: "production",
        PORT: 3000,
        STATIC_DIR: path.join(__dirname, "artifacts/astrobot/dist/public"),
      },
    },
  ],
};
