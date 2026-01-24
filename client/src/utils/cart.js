const KEY = "nokava_cart_v1";

export function readCart() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : { items: [] };
  } catch {
    return { items: [] };
  }
}

export function writeCart(cart) {
  localStorage.setItem(KEY, JSON.stringify(cart));
}

export function addToCart(product, qty = 1) {
  const cart = readCart();
  const i = cart.items.findIndex((x) => x.productId === product.id);
  if (i >= 0) cart.items[i].qty += qty;
  else cart.items.push({ productId: product.id, qty, snapshot: product });
  writeCart(cart);
  return cart;
}

export function setQty(productId, qty) {
  const cart = readCart();
  cart.items = cart.items
    .map((x) => (x.productId === productId ? { ...x, qty } : x))
    .filter((x) => x.qty > 0);
  writeCart(cart);
  return cart;
}

export function removeFromCart(productId) {
  const cart = readCart();
  cart.items = cart.items.filter((x) => x.productId !== productId);
  writeCart(cart);
  return cart;
}

export function cartTotalCents(cart) {
  return cart.items.reduce((sum, x) => sum + (x.snapshot?.priceCents ?? 0) * x.qty, 0);
}
