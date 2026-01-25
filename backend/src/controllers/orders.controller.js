import { prisma } from "../db/prisma.js";

/**
 * Simple email validation helper.
 */
function isValidEmail(email) {
  return typeof email === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * Create an order from cart items (checkout mock).
 * POST /api/orders
 */
export async function createOrder(req, res) {
  const { email = null, items } = req.body ?? {};

  // Email validation (optional field)
  if (email != null && email !== "" && !isValidEmail(email)) {
    return res.status(400).json({
      ok: false,
      error: "VALIDATION_ERROR",
      message: "Invalid email.",
    });
  }

  // Cart validation
  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({
      ok: false,
      error: "VALIDATION_ERROR",
      message: "Cart is empty.",
    });
  }

  /**
   * Expected items format:
   * [{ productId, qty, snapshot: { name, priceCents } }]
   */
  const normalized = [];

  for (const it of items) {
    const qty = Number(it?.qty);
    const snap = it?.snapshot ?? {};
    const name = typeof snap.name === "string" ? snap.name.trim() : "";
    const priceCents = Number(snap.priceCents);

    if (!Number.isInteger(qty) || qty < 1) {
      return res.status(400).json({
        ok: false,
        error: "VALIDATION_ERROR",
        message: "Invalid quantity.",
      });
    }

    if (!name || name.length < 2) {
      return res.status(400).json({
        ok: false,
        error: "VALIDATION_ERROR",
        message: "Invalid product name snapshot.",
      });
    }

    if (!Number.isInteger(priceCents) || priceCents < 0) {
      return res.status(400).json({
        ok: false,
        error: "VALIDATION_ERROR",
        message: "Invalid product price snapshot.",
      });
    }

    normalized.push({
      productId: typeof it.productId === "string" ? it.productId : null,
      qty,
      name,
      priceCents,
    });
  }

  // Compute order total
  const totalCents = normalized.reduce(
    (sum, item) => sum + item.priceCents * item.qty,
    0
  );

  // Persist order and items
  const order = await prisma.order.create({
    data: {
      email: email && email !== "" ? email.toLowerCase() : null,
      totalCents,
      status: "created",
      items: {
        create: normalized.map((item) => ({
          productId: item.productId,
          name: item.name,
          priceCents: item.priceCents,
          qty: item.qty,
        })),
      },
    },
    include: { items: true },
  });

  return res.status(201).json({
    ok: true,
    order,
  });
}

/**
 * List all orders with their items.
 * Admin / debug endpoint.
 * GET /api/orders
 */
export async function listOrders(req, res) {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    include: { items: true },
  });

  return res.json({
    ok: true,
    orders,
  });
}
