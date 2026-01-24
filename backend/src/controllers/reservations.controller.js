function isValidEmail(email) {
  return typeof email === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone) {
  // tolérant (fr + espaces/tirets). Tu peux durcir plus tard.
  return typeof phone === "string" && phone.replace(/[^\d+]/g, "").length >= 8;
}

function parseISODate(dateStr) {
  // attend "YYYY-MM-DD"
  if (typeof dateStr !== "string") return null;
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dateStr);
  if (!m) return null;
  const d = new Date(`${dateStr}T00:00:00`);
  return Number.isNaN(d.getTime()) ? null : d;
}

function parseTime(timeStr) {
  // attend "HH:MM"
  if (typeof timeStr !== "string") return null;
  const m = /^(\d{2}):(\d{2})$/.exec(timeStr);
  if (!m) return null;
  const hh = Number(m[1]);
  const mm = Number(m[2]);
  if (hh < 0 || hh > 23 || mm < 0 || mm > 59) return null;
  return { hh, mm };
}

function combineDateTime(dateStr, timeStr) {
  const d = parseISODate(dateStr);
  const t = parseTime(timeStr);
  if (!d || !t) return null;
  const dt = new Date(d);
  dt.setHours(t.hh, t.mm, 0, 0);
  return dt;
}

function validateReservation(payload) {
  const errors = [];

  const name = payload?.name;
  const email = payload?.email;
  const phone = payload?.phone;
  const date = payload?.date; // "YYYY-MM-DD"
  const time = payload?.time; // "HH:MM"
  const guests = payload?.guests; // number
  const message = payload?.message ?? "";

  if (typeof name !== "string" || name.trim().length < 2) {
    errors.push({ field: "name", message: "Name is required (min 2 chars)." });
  }

  if (!isValidEmail(email)) {
    errors.push({ field: "email", message: "A valid email is required." });
  }

  if (phone != null && phone !== "" && !isValidPhone(phone)) {
    errors.push({ field: "phone", message: "Phone number looks invalid." });
  }

  const dt = combineDateTime(date, time);
  if (!dt) {
    errors.push({ field: "date/time", message: "Date (YYYY-MM-DD) and time (HH:MM) are required." });
  } else {
    const now = new Date();
    if (dt.getTime() < now.getTime() + 10 * 60 * 1000) {
      errors.push({ field: "date/time", message: "Reservation must be at least 10 minutes in the future." });
    }
  }

  const guestsNum = Number(guests);
  if (!Number.isInteger(guestsNum) || guestsNum < 1 || guestsNum > 12) {
    errors.push({ field: "guests", message: "Guests must be an integer between 1 and 12." });
  }

  if (typeof message !== "string") {
    errors.push({ field: "message", message: "Message must be a string." });
  }

  return {
    ok: errors.length === 0,
    errors,
    normalized: {
      name: typeof name === "string" ? name.trim() : "",
      email: typeof email === "string" ? email.trim().toLowerCase() : "",
      phone: typeof phone === "string" ? phone.trim() : "",
      date,
      time,
      guests: guestsNum,
      message: message.trim(),
      requestedAt: new Date().toISOString(),
    },
  };
}

export async function createReservation(req, res) {
  const { ok, errors, normalized } = validateReservation(req.body);

  if (!ok) {
    return res.status(400).json({
      ok: false,
      error: "VALIDATION_ERROR",
      errors,
    });
  }

  // Pour l’instant: pas de DB -> on simule un id
  const reservation = {
    id: `res_${Date.now()}`,
    status: "pending",
    ...normalized,
  };

  return res.status(201).json({
    ok: true,
    reservation,
    message: "Reservation request received.",
  });
}
