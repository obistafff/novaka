import { Fragment, useEffect, useMemo, useState } from "react";
import { apiGet, apiPatch } from "../lib/api.js";

function formatEuros(cents) {
  const value = Number(cents || 0) / 100;
  return value.toLocaleString("fr-FR", {
    style: "currency",
    currency: "EUR",
  });
}

function formatDate(iso) {
  if (!iso) return "—";
  const d = new Date(iso);
  return d.toLocaleString("fr-FR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [openId, setOpenId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError("");
      try {
        const data = await apiGet("/api/orders");
        if (cancelled) return;
        setOrders(Array.isArray(data?.orders) ? data.orders : []);
      } catch (e) {
        if (cancelled) return;
        setError(e?.message || "Erreur lors du chargement des commandes");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  async function updateStatus(id, status) {
    try {
      await apiPatch(`/api/orders/${id}`, { status });

      // Optimistic UI update
      setOrders((prev) =>
        prev.map((o) => (o.id === id ? { ...o, status } : o))
      );
    } catch (e) {
      alert(e.message);
    }
  }

  const totalCount = useMemo(() => orders.length, [orders]);

  return (
    <main className="container section">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: 12,
          alignItems: "baseline",
        }}
      >
        <h1 style={{ margin: 0 }}>Admin · Orders</h1>
        <p style={{ margin: 0, color: "var(--color-muted)" }}>
          {totalCount} commande(s)
        </p>
      </div>

      <div style={{ marginTop: 16 }}>
        {loading && <p>Chargement…</p>}

        {error && (
          <p role="alert" style={{ color: "tomato" }}>
            {error}
          </p>
        )}

        {!loading && !error && orders.length === 0 && (
          <p>Aucune commande pour le moment.</p>
        )}

        {!loading && !error && orders.length > 0 && (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr
                  style={{
                    textAlign: "left",
                    borderBottom: "1px solid rgba(255,255,255,0.12)",
                  }}
                >
                  <th style={{ padding: "10px 8px" }}>ID</th>
                  <th style={{ padding: "10px 8px" }}>Email</th>
                  <th style={{ padding: "10px 8px" }}>Total</th>
                  <th style={{ padding: "10px 8px" }}>Status</th>
                  <th style={{ padding: "10px 8px" }}>Date</th>
                  <th style={{ padding: "10px 8px" }}></th>
                </tr>
              </thead>

              <tbody>
                {orders.map((o) => {
                  const isOpen = openId === o.id;

                  return (
                    <Fragment key={o.id}>
                      <tr
                        style={{
                          borderBottom:
                            "1px solid rgba(255,255,255,0.08)",
                        }}
                      >
                        <td
                          style={{
                            padding: "10px 8px",
                            fontFamily: "monospace",
                          }}
                        >
                          {o.id}
                        </td>

                        <td style={{ padding: "10px 8px" }}>
                          {o.email || "—"}
                        </td>

                        <td style={{ padding: "10px 8px" }}>
                          {formatEuros(o.totalCents)}
                        </td>

                        <td style={{ padding: "10px 8px" }}>
                          <strong>{o.status}</strong>

                          {o.status === "created" && (
                            <div
                              style={{
                                display: "flex",
                                gap: 6,
                                marginTop: 6,
                              }}
                            >
                              <button
                                onClick={() =>
                                  updateStatus(o.id, "confirmed")
                                }
                              >
                                Confirm
                              </button>
                              <button
                                onClick={() =>
                                  updateStatus(o.id, "cancelled")
                                }
                              >
                                Cancel
                              </button>
                            </div>
                          )}
                        </td>

                        <td style={{ padding: "10px 8px" }}>
                          {formatDate(o.createdAt)}
                        </td>

                        <td style={{ padding: "10px 8px" }}>
                          <button
                            type="button"
                            onClick={() =>
                              setOpenId(isOpen ? null : o.id)
                            }
                            style={{ cursor: "pointer" }}
                          >
                            {isOpen ? "Masquer" : "Détails"}
                          </button>
                        </td>
                      </tr>

                      {isOpen && (
                        <tr>
                          <td
                            colSpan={6}
                            style={{
                              padding: "12px 8px",
                              background:
                                "rgba(255,255,255,0.03)",
                            }}
                          >
                            <div
                              style={{
                                display: "grid",
                                gap: 8,
                              }}
                            >
                              <strong>Items</strong>

                              {Array.isArray(o.items) &&
                              o.items.length > 0 ? (
                                <ul
                                  style={{
                                    margin: 0,
                                    paddingLeft: 18,
                                  }}
                                >
                                  {o.items.map((it) => (
                                    <li key={it.id}>
                                      {it.name} — x{it.qty} —{" "}
                                      {formatEuros(it.priceCents)}
                                    </li>
                                  ))}
                                </ul>
                              ) : (
                                <p
                                  style={{
                                    margin: 0,
                                    color:
                                      "var(--color-muted)",
                                  }}
                                >
                                  Aucun item.
                                </p>
                              )}
                            </div>
                          </td>
                        </tr>
                      )}
                    </Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}
