const KEY = "nokava_cart_v1";

function normalizeId(value) {
  if (value === null || value === undefined) return "";
  return String(value);
}

function normalizeSnapshot(p) {
  // snapshot minimal attendu par Panier + backend createOrder
  return {
    name: typeof p?.name === "string" ? p.name : (p?.snapshot?.name || "Produit"),
    priceCents: Number(p?.priceCents ?? p?.snapshot?.priceCents ?? 0),
  };
}

export function readCart() {
  try {
    const raw = localStorage.getItem(KEY);
    const data = raw ? JSON.parse(raw) : null;
    if (data && Array.isArray(data.items)) return data;
    return { items: [] };
  } catch {
    return { items: [] };
  }
}

function writeCart(cart) {
  localStorage.setItem(KEY, JSON.stringify(cart));
  window.dispatchEvent(new Event("cart:updated"));
}

export function clearCart() {
  const cart = { items: [] };
  writeCart(cart);
  return cart;
}

/**
 * addToCart supports:
 * - a product object from API: { id, name, priceCents, ... }
 * - or an item-like object: { productId, qty, snapshot }
 */
export function addToCart(input, qty = 1) {
  const cart = readCart();

  // Accept both shapes
  const productId = normalizeId(input?.productId ?? input?.id);
  const addQty = Number(input?.qty ?? qty);

  if (!productId) return cart;
  if (!Number.isFinite(addQty) || addQty < 1) return cart;

  const snapshot = input?.snapshot ? normalizeSnapshot(input.snapshot) : normalizeSnapshot(input);

  const i = cart.items.findIndex((x) => normalizeId(x.productId) === productId);

  if (i >= 0) {
    cart.items[i] = {
      ...cart.items[i],
      qty: Number(cart.items[i].qty || 0) + addQty,
      snapshot: cart.items[i].snapshot || snapshot,
    };
  } else {
    cart.items.push({
      productId,
      qty: addQty,
      snapshot,
    });
  }

  writeCart(cart);
  return cart;
}

export function setQty(productId, qty) {
  const id = normalizeId(productId);
  const q = Number(qty);

  const cart = readCart();
  cart.items = cart.items
    .map((x) => (normalizeId(x.productId) === id ? { ...x, qty: q } : x))
    .filter((x) => Number(x.qty) > 0);

  writeCart(cart);
  return cart;
}

export function removeFromCart(productId) {
  const id = normalizeId(productId);
  const cart = readCart();
  cart.items = cart.items.filter((x) => normalizeId(x.productId) !== id);

  writeCart(cart);
  return cart;
}

export function cartTotalCents(cart) {
  return (cart?.items ?? []).reduce(
    (sum, x) => sum + (Number(x.snapshot?.priceCents) || 0) * (Number(x.qty) || 0),
    0
  );
}
