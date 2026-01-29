const KEY = "nokava_cart_v1";
const EVENT_NAME = "nokava-cart:updated";

function notifyCartUpdated() {
  try {
    window.dispatchEvent(new Event(EVENT_NAME));
  } catch {
    // noop
  }
}

function normalizeItems(rawValue) {
  // Format actuel détecté: { items: [...] }
  if (rawValue && typeof rawValue === "object" && Array.isArray(rawValue.items)) {
    return rawValue.items;
  }
  // Ancien format possible: [...]
  if (Array.isArray(rawValue)) return rawValue;
  return [];
}

export function readCart() {
  try {
    const raw = localStorage.getItem(KEY);
    const parsed = raw ? JSON.parse(raw) : null;
    return normalizeItems(parsed);
  } catch {
    return [];
  }
}

export function writeCart(items) {
  // On conserve le format { items: [...] } pour rester cohérent avec ton app
  localStorage.setItem(KEY, JSON.stringify({ items }));
  notifyCartUpdated();
}

export function addToCart(product, qty = 1) {
  const q = Number(qty);
  if (!Number.isFinite(q) || q < 1) return readCart();

  const items = readCart();

  const productId =
    product?.id ??
    product?.productId ??
    product?.sku ??
    product?.slug ??
    product?.name;

  if (!productId) return items;

  const name = product?.name ?? product?.title ?? "Produit";
  const priceCents = Number(product?.priceCents ?? product?.price ?? 0);

  const idx = items.findIndex((it) => it.productId === productId);

  if (idx >= 0) {
    items[idx] = { ...items[idx], qty: (Number(items[idx].qty) || 0) + q };
  } else {
    items.push({
      productId,
      qty: q,
      snapshot: { name, priceCents },
    });
  }

  writeCart(items);
  return items;
}

export function removeFromCart(productId) {
  const items = readCart().filter((it) => it.productId !== productId);
  writeCart(items);
  return items;
}

export function setQty(productId, qty) {
  const q = Number(qty);
  const nextQty = Math.max(1, Number.isFinite(q) ? q : 1);

  const items = readCart().map((it) =>
    it.productId === productId ? { ...it, qty: nextQty } : it
  );

  writeCart(items);
  return items;
}

export function clearCart() {
  writeCart([]);
  return [];
}

export function cartCount() {
  return readCart().reduce((sum, it) => sum + (Number(it.qty) || 0), 0);
}

export const CART_UPDATED_EVENT = EVENT_NAME;
