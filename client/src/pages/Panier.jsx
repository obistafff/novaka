import { useEffect, useMemo, useState } from "react";
import {
  readCart,
  setQty,
  removeFromCart,
  cartTotalCents,
  clearCart,
} from "../utils/cart.js";

function euro(cents) {
  return (cents / 100).toFixed(2).replace(".", ",") + " €";
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

  const items = cart?.items ?? [];
  const isEmpty = items.length === 0;

  const total = useMemo(() => cartTotalCents(cart), [cart]);

  async function onCheckout() {
    // ✅ Defensive check (security)
    if (isEmpty) {
      setCheckout({
        status: "error",
        message: "Votre panier est vide. Ajoutez un article avant de valider.",
        orderId: "",
      });
      return;
    }

    if (checkout.status === "loading") return;

    setCheckout({
      status: "loading",
      message: "Commande en cours d’envoi…",
      orderId: "",
    });

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim() || null,
          items,
        }),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        setCheckout({
          status: "error",
          message: data?.message || "Erreur serveur. Réessayez dans un instant.",
          orderId: "",
        });
        return;
      }

      // ✅ Success → clear cart and show confirmation
      setCart(clearCart());
      setEmail("");

      setCheckout({
        status: "success",
        message: "Commande créée ✅ Merci ! Vous recevrez une confirmation si vous avez renseigné un email.",
        orderId: data?.order?.id || "",
      });
    } catch (err) {
      setCheckout({
        status: "error",
        message: "Impossible de joindre le serveur. Le backend est-il bien lancé ?",
        orderId: "",
      });
    }
  }

  return (
    <main className="section">
      <div className="container">
        <h1>Panier</h1>

        {isEmpty && checkout.status !== "success" && (
          <p className="muted">Votre panier est vide.</p>
        )}

        {items.map((item) => (
          <div key={item.productId} className="card" style={{ marginBottom: 12 }}>
            <strong>{item.snapshot?.name || "Produit"}</strong>

            <div style={{ display: "flex", gap: 8, marginTop: 8, alignItems: "center" }}>
              <input
                type="number"
                min="1"
                value={item.qty}
                onChange={(e) =>
                  setCart(setQty(item.productId, Number(e.target.value)))
                }
                style={{ width: 90 }}
              />

              <button
                className="btn btn-secondary"
                onClick={() => setCart(removeFromCart(item.productId))}
              >
                Supprimer
              </button>
            </div>

            <div className="muted" style={{ marginTop: 6 }}>
              {euro(item.snapshot?.priceCents ?? 0)} × {item.qty}
            </div>
          </div>
        ))}

        {/* Checkout block: always visible, but disabled if empty */}
        <hr style={{ opacity: 0.2, margin: "18px 0" }} />

        <div className="field">
          <label htmlFor="email">Email (optionnel)</label>
          <input
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="vous@exemple.com"
            autoComplete="email"
            disabled={checkout.status === "loading"}
          />
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 12 }}>
          <strong>Total</strong>
          <strong>{euro(total)}</strong>
        </div>

        <div style={{ display: "flex", gap: 8, marginTop: 16, alignItems: "center", flexWrap: "wrap" }}>
          <button
            className="btn btn-primary"
            onClick={onCheckout}
            disabled={isEmpty || checkout.status === "loading"}
            title={isEmpty ? "Ajoutez un article au panier pour valider." : ""}
          >
            {checkout.status === "loading" ? "Envoi…" : "Valider la commande (mock)"}
          </button>

          <button
            className="btn btn-secondary"
            onClick={() => setCart(clearCart())}
            disabled={isEmpty || checkout.status === "loading"}
          >
            Vider le panier
          </button>

          {isEmpty && (
            <span className="muted" style={{ marginLeft: 4 }}>
              Ajoutez un article depuis la boutique pour activer le checkout.
            </span>
          )}
        </div>

        {checkout.status !== "idle" && (
          <div className="card" style={{ marginTop: 16 }}>
            <p style={{ marginTop: 0 }}>{checkout.message}</p>
            {checkout.orderId && (
              <p className="muted" style={{ marginBottom: 0 }}>
                Order ID: {checkout.orderId}
              </p>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
