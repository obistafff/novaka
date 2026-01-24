import { useEffect, useState } from "react";
import { addToCart } from "../utils/cart.js";

export default function Boutique() {
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        setProducts(data.products ?? []);
        setStatus("idle");
      } catch {
        setStatus("error");
      }
    })();
  }, []);

  function euro(priceCents) {
    return (priceCents / 100).toFixed(2).replace(".", ",") + " €";
  }

  return (
    <main>
      <section className="section">
        <div className="container">
          <header className="section-head">
            <h1 className="section-title">Boutique</h1>
            <div className="section-line" />
          </header>

          {status === "loading" && <p style={{ color: "var(--color-muted)" }}>Chargement…</p>}
          {status === "error" && <p style={{ color: "var(--color-muted)" }}>Erreur: API indisponible.</p>}

          <div className="grid-3">
            {products.map((p) => (
              <article key={p.id} className="card" style={{ padding: 16, display: "grid", gap: 10 }}>
                {p.imageUrl && (
                  <img
                    src={p.imageUrl}
                    alt={p.name}
                    style={{ width: "100%", height: 160, objectFit: "cover", borderRadius: 12 }}
                  />
                )}
                <div>
                  <h3 style={{ margin: 0 }}>{p.name}</h3>
                  {p.description && <p style={{ marginTop: 6, color: "var(--color-muted)" }}>{p.description}</p>}
                </div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
                  <strong>{euro(p.priceCents)}</strong>
                  <button
                    className="btn btn-primary"
                    onClick={() => addToCart(p, 1)}
                  >
                    Ajouter
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
