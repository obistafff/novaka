import { useEffect, useState } from "react";
import { readCart, setQty, removeFromCart, cartTotalCents } from "../utils/cart.js";
import { clearCart } from "../utils/cart.js";


export default function Panier() {
  const [cart, setCart] = useState(readCart());

  useEffect(() => {
    const onStorage = () => setCart(readCart());
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  function euro(cents) {
    return (cents / 100).toFixed(2).replace(".", ",") + " €";
  }

  const total = cartTotalCents(cart);

  return (
    <main>
      <section className="section">
        <div className="container">
          <header className="section-head">
            <h1 className="section-title">Panier</h1>
            <div className="section-line" />
          </header>

          {cart.items.length === 0 ? (
            <p style={{ color: "var(--color-muted)" }}>Ton panier est vide.</p>
          ) : (
            <div className="card" style={{ padding: 16, display: "grid", gap: 12 }}>
              {cart.items.map((it) => (
                <div key={it.productId} style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
                  <div style={{ minWidth: 0 }}>
                    <strong>{it.snapshot?.name ?? "Produit"}</strong>
                    <div style={{ color: "var(--color-muted)", marginTop: 4 }}>
                      {(it.snapshot?.priceCents ?? 0) / 100}€ × {it.qty}
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <input
                      type="number"
                      min="1"
                      value={it.qty}
                      onChange={(e) => setCart(setQty(it.productId, Number(e.target.value)))}
                      style={{ width: 72 }}
                    />
                    <button className="btn btn-secondary" onClick={() => setCart(removeFromCart(it.productId))}>
                      Retirer
                    </button>

                    <button className="btn btn-secondary" onClick={() => setCart(clearCart())}>
                     Vider le panier
                    </button>
                  </div>
                </div>
              ))}

              <hr style={{ opacity: 0.15, width: "100%" }} />

              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <strong>Total</strong>
                <strong>{euro(total)}</strong>
              </div>

              <button className="btn btn-primary" disabled>
                Commander (mock)
              </button>
              <p style={{ margin: 0, color: "var(--color-muted)" }}>
                Paiement / commande: on simulera plus tard (objectif: mini e-commerce).
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
