import crypto from "crypto";

const CSRF_COOKIE = "novaka_csrf";

function sign(token, secret) {
  return crypto.createHmac("sha256", secret).update(token).digest("hex");
}

export function csrfSetToken(req, res, next) {
  const secret = process.env.CSRF_SECRET || "dev";
  const token = crypto.randomBytes(24).toString("hex");
  const sig = sign(token, secret);

  // cookie readable by JS (not httpOnly) for double-submit
  res.cookie(CSRF_COOKIE, token, {
    httpOnly: false,
    sameSite: "lax",
    secure: false, // true in prod over https
    path: "/",
  });

  res.setHeader("X-CSRF-Token", `${token}.${sig}`);
  next();
}

export function csrfProtect(req, res, next) {
  const secret = process.env.CSRF_SECRET || "dev";

  const header = req.get("x-csrf-token") || "";
  const [token, sig] = header.split(".");

  const cookieToken = req.cookies?.[CSRF_COOKIE];

  if (!token || !sig || !cookieToken) {
    return res.status(403).json({ ok: false, error: "CSRF", message: "Missing CSRF token." });
  }
  if (token !== cookieToken) {
    return res.status(403).json({ ok: false, error: "CSRF", message: "CSRF token mismatch." });
  }

  const expected = sign(token, secret);
  if (expected !== sig) {
    return res.status(403).json({ ok: false, error: "CSRF", message: "Invalid CSRF token." });
  }

  next();
}
