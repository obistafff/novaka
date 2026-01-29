import { findSession } from "../auth/auth.repo.js";
import { getMongoDb } from "../db/mongo.js";
import { ObjectId } from "mongodb";

const USERS = "users";

export async function requireAuth(req, res, next) {
  const cookieName = process.env.SESSION_COOKIE_NAME || "novaka_sid";
  const sid = req.cookies?.[cookieName];
  if (!sid) return res.status(401).json({ ok: false, error: "UNAUTHORIZED" });

  const session = await findSession(sid);
  if (!session) return res.status(401).json({ ok: false, error: "UNAUTHORIZED" });

  const db = await getMongoDb();
  const user = await db.collection(USERS).findOne({ _id: new ObjectId(session.userId) });
  if (!user) return res.status(401).json({ ok: false, error: "UNAUTHORIZED" });

  req.user = { id: String(user._id), email: user.email, role: user.role };
  req.session = { sid: session.sid };
  next();
}

export function requireAdmin(req, res, next) {
  // requireAuth doit être passé avant
  if (!req.user) {
    return res.status(401).json({ ok: false, error: "UNAUTHORIZED" });
  }

  if (req.user.role !== "admin") {
    return res.status(403).json({ ok: false, error: "FORBIDDEN" });
  }

  next();
}
