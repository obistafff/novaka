import { useEffect, useState } from "react";
import {
  readCart,
  setQty,
  removeFromCart,
  cartTotalCents,
  clearCart,
} from "../utils/cart.js";

function euro(cents) {
  return (cents / 100).toFixed(2) + " €";
}

export default function Panier() {
  const [cart, setCart] = useState(readCart());

  // Checkout state machine
  const [checkout, setCheckout] = useState({
    status: "idle", // idle | loading | success | error
    message: "",
    orderId: "",
  });

  // Optional email for order
  const [email, setEmail] = useState("");

  // Sync cart updates (badge, other tabs, etc.)
  useEffect(() => {
    function onUpdate() {
      setCart(readCart());
    }
    window.addEventListener("cart:updated", onUpdate);
    return () => window.removeEventListener("cart:updated", onUpdate);
  }, []);

  const total = cartTotalCents(cart);

  async function onCheckout() {
    if (cart.items.length === 0) return;

    setCheckout({
      status: "loading",
      message: "Sending order...",
      orderId: "",
    });

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim() || null,
          items: cart.items,
        }),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        setCheckout({
          status: "error",
          message: data?.message || "Server error. Please try again.",
          orderId: "",
        });
        return;
      }

      // Success → clear cart and show confirmation
      setCart(clearCart());
      setCheckout({
        status: "success",
        message: "Order successfully created ✅",
        orderId: data?.order?.id || "",
      });
    } catch (err) {
      setCheckout({
        status: "error",
        message: "Unable to reach the server. Is the backend running?",
        orderId: "",
      });
    }
  }

  return (
    <main className="section">
      <div className="container">
        <h1>Cart</h1>

        {cart.items.length === 0 && checkout.status !== "success" && (
          <p className="muted">Your cart is empty.</p>
        )}

        {cart.items.map((item) => (
          <div key={item.productId} className="card" style={{ marginBottom: 12 }}>
            <strong>{item.snapshot.name}</strong>

            <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
              <input
                type="number"
                min="1"
                value={item.qty}
                onChange={(e) =>
                  setCart(setQty(item.productId, Number(e.target.value)))
                }
              />

              <button
                className="btn btn-secondary"
                onClick={() => setCart(removeFromCart(item.productId))}
              >
                Remove
              </button>
            </div>

            <div className="muted" style={{ marginTop: 6 }}>
              {euro(item.snapshot.priceCents)} × {item.qty}
            </div>
          </div>
        ))}

        {cart.items.length > 0 && (
          <>
            <hr style={{ opacity: 0.2 }} />

            {/* Optional email */}
            <div className="field">
              <label htmlFor="email">Email (optional)</label>
              <input
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                autoComplete="email"
              />
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 12 }}>
              <strong>Total</strong>
              <strong>{euro(total)}</strong>
            </div>

            <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
              <button
                className="btn btn-primary"
                onClick={onCheckout}
                disabled={checkout.status === "loading"}
              >
                {checkout.status === "loading" ? "Sending..." : "Checkout (mock)"}
              </button>

              <button
                className="btn btn-secondary"
                onClick={() => setCart(clearCart())}
              >
                Clear cart
              </button>
            </div>
          </>
        )}

        {checkout.status !== "idle" && (
          <div className="card" style={{ marginTop: 16 }}>
            <p>{checkout.message}</p>
            {checkout.orderId && (
              <p className="muted">Order ID: {checkout.orderId}</p>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
