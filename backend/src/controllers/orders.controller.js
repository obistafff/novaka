import { prisma } from "../db/prisma.js";

function isValidEmail(email) {
  return typeof email === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function createOrder(req, res) {
  const { email = null, items } = req.body ?? {};

  if (email != null && email !== "" && !isValidEmail(email)) {
    return res.status(400).json({ ok: false, error: "VALIDATION_ERROR", message: "Invalid email." });
  }

  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ ok: false, error: "VALIDATION_ERROR", message: "Cart is empty." });
  }

  // items: [{ productId, qty, snapshot: { name, priceCents } }]
  const normalized = [];
  for (const it of items) {
    const qty = Number(it?.qty);
    const snap = it?.snapshot ?? {};
    const name = typeof snap.name === "string" ? snap.name.trim() : "";
    const priceCents = Number(snap.priceCents);

    if (!Number.isInteger(qty) || qty < 1) {
      return res.status(400).json({ ok: false, error: "VALIDATION_ERROR", message: "Invalid qty." });
    }
    if (!name || name.length < 2) {
      return res.status(400).json({ ok: false, error: "VALIDATION_ERROR", message: "Invalid product name snapshot." });
    }
    if (!Number.isInteger(priceCents) || priceCents < 0) {
      return res.status(400).json({ ok: false, error: "VALIDATION_ERROR", message: "Invalid price snapshot." });
    }

    normalized.push({
      productId: typeof it.productId === "string" ? it.productId : null,
      qty,
      name,
      priceCents,
    });
  }

  const totalCents = normalized.reduce((sum, x) => sum + x.priceCents * x.qty, 0);

  const order = await prisma.order.create({
    data: {
      email: email && email !== "" ? email.toLowerCase() : null,
      totalCents,
      status: "created",
      items: {
        create: normalized.map((x) => ({
          productId: x.productId,
          name: x.name,
          priceCents: x.priceCents,
          qty: x.qty,
        })),
      },
    },
    include: { items: true },
  });

  return res.status(201).json({ ok: true, order });
}
