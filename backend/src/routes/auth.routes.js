import { Router } from "express";
import { z } from "zod";
import {
  createUser,
  findUserByEmail,
  verifyPassword,
  createSession,
  deleteSession,
} from "../auth/auth.repo.js";
import { csrfProtect, csrfSetToken } from "../middlewares/csrf.js";
import { loginLimiter, authLimiter } from "../middlewares/security.js";
import { requireAuth } from "../middlewares/auth.js";

const router = Router();

const RegisterSchema = z.object({
  email: z.string().email().max(255),
  password: z.string().min(8).max(128),
});

const LoginSchema = z.object({
  email: z.string().email().max(255),
  password: z.string().min(8).max(128),
});

// Provide CSRF token
router.get("/csrf", csrfSetToken, (req, res) => {
  return res.json({ ok: true });
});

// Register
router.post("/register", authLimiter, csrfProtect, async (req, res) => {
  const parsed = RegisterSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ ok: false, error: "VALIDATION_ERROR" });
  }

  try {
    const user = await createUser(parsed.data);
    return res.status(201).json({ ok: true, user: { id: user.id, email: user.email } });
  } catch (e) {
    return res.status(409).json({ ok: false, error: "EMAIL_TAKEN", message: "Email already in use." });
  }
});

// Login
router.post("/login", loginLimiter, csrfProtect, async (req, res) => {
  const parsed = LoginSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ ok: false, error: "VALIDATION_ERROR" });
  }

  const user = await findUserByEmail(parsed.data.email);
  if (!user) {
    return res.status(401).json({ ok: false, error: "INVALID_CREDENTIALS" });
  }

  const ok = await verifyPassword(user, parsed.data.password);
  if (!ok) {
    return res.status(401).json({ ok: false, error: "INVALID_CREDENTIALS" });
  }

  const session = await createSession({
    userId: String(user._id),
    ip: req.ip,
    userAgent: req.get("user-agent"),
  });

  const cookieName = process.env.SESSION_COOKIE_NAME || "novaka_sid";

  res.cookie(cookieName, session.sid, {
    httpOnly: true,
    sameSite: "lax",
    secure: false, // true in prod (https)
    path: "/",
  });

  return res.json({ ok: true, user: { id: String(user._id), email: user.email } });
});

// Logout
router.post("/logout", csrfProtect, async (req, res) => {
  const cookieName = process.env.SESSION_COOKIE_NAME || "novaka_sid";
  const sid = req.cookies?.[cookieName];
  if (sid) await deleteSession(sid);

  res.clearCookie(cookieName, { path: "/" });
  return res.json({ ok: true });
});

// Me
router.get("/me", requireAuth, async (req, res) => {
  return res.json({ ok: true, user: req.user });
});

export default router;
