import helmet from "helmet";
import rateLimit from "express-rate-limit";

export const helmetMw = helmet({
  contentSecurityPolicy: false, // dev-friendly; we can tighten later
});

export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 20,
  standardHeaders: "draft-7",
  legacyHeaders: false,
});

export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: "draft-7",
  legacyHeaders: false,
});
