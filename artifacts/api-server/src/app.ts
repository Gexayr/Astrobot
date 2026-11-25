import express, {
  type Express,
  type NextFunction,
  type Request,
  type Response,
} from "express";
import cors from "cors";
import path from "node:path";
import fs from "node:fs";
import pinoHttp from "pino-http";
import router from "./routes";
import { logger } from "./lib/logger";

const app: Express = express();

// Behind nginx / Docker proxy: trust X-Forwarded-* so req.ip is the real client IP.
app.set("trust proxy", Number(process.env["TRUST_PROXY_HOPS"] ?? 1));
app.disable("x-powered-by");

app.use(
  pinoHttp({
    logger,
    serializers: {
      req(req) {
        return {
          id: req.id,
          method: req.method,
          url: req.url?.split("?")[0],
        };
      },
      res(res) {
        return {
          statusCode: res.statusCode,
        };
      },
    },
  }),
);

// CORS_ORIGIN="https://astrobot.example.com,https://www.astrobot.example.com"
// Not needed when the site and API share an origin (default deployment).
const corsOrigin = process.env["CORS_ORIGIN"];
if (corsOrigin) {
  app.use("/api", cors({ origin: corsOrigin.split(",").map((s) => s.trim()) }));
}

app.use(express.json({ limit: "20kb" }));
app.use(express.urlencoded({ extended: true, limit: "20kb" }));

app.use("/api", router);
app.use("/api", (_req, res) => {
  res.status(404).json({ error: "Not found" });
});

// Optionally serve the built landing page from the same process (single container).
const staticDir = process.env["STATIC_DIR"];
if (staticDir && fs.existsSync(path.join(staticDir, "index.html"))) {
  app.use(
    "/assets",
    express.static(path.join(staticDir, "assets"), {
      immutable: true,
      maxAge: "1y",
    }),
  );
  app.use(express.static(staticDir, { maxAge: "1h", index: false, redirect: false }));
  // Prerendered pages (artifacts/astrobot/scripts/prerender.mjs); anything else is a real 404
  // so search engines don't index random URLs as copies of the home page.
  const pages: Record<string, string> = {
    "/": "index.html",
    "/privacy": "privacy/index.html",
    "/terms": "terms/index.html",
  };
  app.get("/{*splat}", (req, res) => {
    const key = req.path.length > 1 ? req.path.replace(/\/+$/, "") : req.path;
    const page = pages[key];
    res.setHeader("Cache-Control", "no-cache");
    if (!page) res.status(404);
    res.sendFile(path.join(staticDir, page ?? "index.html"));
  });
  logger.info({ staticDir }, "Serving static frontend");
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: unknown, req: Request, res: Response, _next: NextFunction) => {
  if (res.headersSent) return;
  // Malformed JSON / oversized body from express.json(): client error, not a 500.
  const status = (err as { status?: number; type?: string })?.status;
  if (typeof status === "number" && status >= 400 && status < 500) {
    res.status(status).json({ error: status === 413 ? "Request too large" : "Invalid request body" });
    return;
  }
  req.log.error({ err }, "Unhandled error");
  res.status(500).json({ error: "Internal server error" });
});

export default app;
