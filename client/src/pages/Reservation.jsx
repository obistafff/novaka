import { useState } from "react";

export default function Reservation() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    guests: 2,
    message: "",
  });

  const [status, setStatus] = useState({ type: "idle", message: "" });
  const [fieldErrors, setFieldErrors] = useState({});

  function onChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    setStatus({ type: "loading", message: "Envoi en cours..." });
    setFieldErrors({});

    try {
      const res = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          guests: Number(form.guests),
        }),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        if (data?.error === "VALIDATION_ERROR" && Array.isArray(data?.errors)) {
          const mapped = {};
          for (const err of data.errors) {
            mapped[err.field] = err.message;
          }
          setFieldErrors(mapped);
          setStatus({
            type: "error",
            message: "Certains champs sont invalides.",
          });
          return;
        }

        setStatus({
          type: "error",
          message: data?.message || "Erreur serveur. Réessaie plus tard.",
        });
        return;
      }

      setStatus({
        type: "success",
        message: "Demande envoyée ✅ Nous te confirmerons rapidement par e-mail.",
      });

      setForm({
        name: "",
        email: "",
        phone: "",
        date: "",
        time: "",
        guests: 2,
        message: "",
      });
    } catch (err) {
      setStatus({
        type: "error",
        message:
          "Impossible de contacter le serveur. Vérifie que le backend est lancé.",
      });
    }
  }

  return (
    <main>
      <section className="section">
        <div className="container">
          <header className="section-head">
            <h1 className="section-title">Réservations</h1>
            <div className="section-line" />
          </header>

          <div className="card" style={{ padding: 20 }}>
            <form className="form" onSubmit={onSubmit}>
              <div className="grid-2">
                <div className="field">
                  <label htmlFor="name">Nom *</label>
                  <input
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={onChange}
                  />
                  {fieldErrors.name && (
                    <p className="field-error">{fieldErrors.name}</p>
                  )}
                </div>

                <div className="field">
                  <label htmlFor="email">E-mail *</label>
                  <input
                    id="email"
                    name="email"
                    value={form.email}
                    onChange={onChange}
                  />
                  {fieldErrors.email && (
                    <p className="field-error">{fieldErrors.email}</p>
                  )}
                </div>

                <div className="field">
                  <label htmlFor="phone">Téléphone</label>
                  <input
                    id="phone"
                    name="phone"
                    value={form.phone}
                    onChange={onChange}
                  />
                  {fieldErrors.phone && (
                    <p className="field-error">{fieldErrors.phone}</p>
                  )}
                </div>

                <div className="field">
                  <label htmlFor="guests">Nombre de personnes *</label>
                  <input
                    id="guests"
                    name="guests"
                    type="number"
                    min="1"
                    max="12"
                    value={form.guests}
                    onChange={onChange}
                  />
                  {fieldErrors.guests && (
                    <p className="field-error">{fieldErrors.guests}</p>
                  )}
                </div>

                <div className="field">
                  <label htmlFor="date">Date *</label>
                  <input
                    id="date"
                    name="date"
                    type="date"
                    value={form.date}
                    onChange={onChange}
                  />
                  {fieldErrors["date/time"] && (
                    <p className="field-error">
                      {fieldErrors["date/time"]}
                    </p>
                  )}
                </div>

                <div className="field">
                  <label htmlFor="time">Heure *</label>
                  <input
                    id="time"
                    name="time"
                    type="time"
                    value={form.time}
                    onChange={onChange}
                  />
                </div>
              </div>

              <div className="field" style={{ marginTop: 14 }}>
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  value={form.message}
                  onChange={onChange}
                />
                {fieldErrors.message && (
                  <p className="field-error">{fieldErrors.message}</p>
                )}
              </div>

              <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
                <button
                  className="btn btn-primary"
                  disabled={status.type === "loading"}
                >
                  {status.type === "loading"
                    ? "Envoi..."
                    : "Envoyer la demande"}
                </button>
                <a className="btn btn-secondary" href="/carte">
                  Voir la carte
                </a>
              </div>

              {status.type !== "idle" && (
                <div className="card" style={{ marginTop: 16, padding: 14 }}>
                  <p style={{ margin: 0 }}>{status.message}</p>
                </div>
              )}
            </form>
          </div>

          <p style={{ marginTop: 14, color: "var(--color-muted)" }}>
            Astuce : le frontend appelle l’API via <code>/api</code> (proxy Vite).
          </p>
        </div>
      </section>
    </main>
  );
}
