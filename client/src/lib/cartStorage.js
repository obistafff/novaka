const KEY = "nokava_cart_v1";

export function readCart() {
  try {
    const raw = localStorage.getItem(KEY);
    const data = raw ? JSON.parse(raw) : [];
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

export function writeCart(items) {
  localStorage.setItem(KEY, JSON.stringify(items));
}

export function addToCart(product, qty = 1) {
  const q = Number(qty);
  if (!Number.isFinite(q) || q < 1) return readCart();

  const cart = readCart();
  const id = product?.id ?? product?.productId ?? product?.sku ?? product?.slug ?? product?.name;
  const name = product?.name ?? product?.title ?? "Produit";
  const priceCents = Number(product?.priceCents ?? product?.price ?? 0);

  if (!id) return cart;

  const idx = cart.findIndex((it) => it.id === id);
  if (idx >= 0) {
    cart[idx] = { ...cart[idx], qty: cart[idx].qty + q };
  } else {
    cart.push({ id, name, priceCents, qty: q });
  }

  writeCart(cart);
  return cart;
}

export function removeFromCart(id) {
  const cart = readCart().filter((it) => it.id !== id);
  writeCart(cart);
  return cart;
}

export function setQty(id, qty) {
  const q = Number(qty);
  const cart = readCart().map((it) =>
    it.id === id ? { ...it, qty: Math.max(1, q || 1) } : it
  );
  writeCart(cart);
  return cart;
}

export function clearCart() {
  writeCart([]);
  return [];
}

export function cartCount() {
  return readCart().reduce((sum, it) => sum + (Number(it.qty) || 0), 0);
}
