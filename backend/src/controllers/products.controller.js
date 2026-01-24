import { prisma } from "../db/prisma.js";

export async function listProducts(req, res) {
  const products = await prisma.product.findMany({
    where: { isActive: true },
    orderBy: { createdAt: "desc" },
  });
  return res.json({ ok: true, products });
}

// endpoints "admin/dev" (simple, sans auth pour l’instant)
export async function createProduct(req, res) {
  const { name, description = null, priceCents, imageUrl = null, isActive = true } = req.body ?? {};

  if (!name || typeof name !== "string" || name.trim().length < 2) {
    return res.status(400).json({ ok: false, error: "VALIDATION_ERROR", message: "name is required" });
  }
  const price = Number(priceCents);
  if (!Number.isInteger(price) || price < 0) {
    return res.status(400).json({ ok: false, error: "VALIDATION_ERROR", message: "priceCents must be an integer >= 0" });
  }

  const product = await prisma.product.create({
    data: {
      name: name.trim(),
      description: typeof description === "string" ? description.trim() : null,
      priceCents: price,
      imageUrl: typeof imageUrl === "string" ? imageUrl.trim() : null,
      isActive: Boolean(isActive),
    },
  });

  return res.status(201).json({ ok: true, product });
}

export async function updateProduct(req, res) {
  const { id } = req.params;
  const patch = req.body ?? {};

  const data = {};
  if (typeof patch.name === "string") data.name = patch.name.trim();
  if (typeof patch.description === "string") data.description = patch.description.trim();
  if (patch.description === null) data.description = null;
  if (patch.imageUrl === null) data.imageUrl = null;
  if (typeof patch.imageUrl === "string") data.imageUrl = patch.imageUrl.trim();
  if (patch.isActive != null) data.isActive = Boolean(patch.isActive);
  if (patch.priceCents != null) {
    const price = Number(patch.priceCents);
    if (!Number.isInteger(price) || price < 0) {
      return res.status(400).json({ ok: false, error: "VALIDATION_ERROR", message: "priceCents must be an integer >= 0" });
    }
    data.priceCents = price;
  }

  try {
    const product = await prisma.product.update({ where: { id }, data });
    return res.json({ ok: true, product });
  } catch {
    return res.status(404).json({ ok: false, error: "NOT_FOUND", message: "Product not found" });
  }
}

export async function deleteProduct(req, res) {
  const { id } = req.params;
  try {
    await prisma.product.delete({ where: { id } });
    return res.status(204).send();
  } catch {
    return res.status(404).json({ ok: false, error: "NOT_FOUND", message: "Product not found" });
  }
}
