import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

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
          for (const err of data.errors) mapped[err.field] = err.message;
          setFieldErrors(mapped);
          setStatus({ type: "error", message: "Certains champs sont invalides." });
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
        message: "Impossible de contacter le serveur. Vérifie que le backend est lancé.",
      });
    }
  }

  // (Optionnel) scroller en haut quand on arrive sur la page
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="page-reservation">
      <section className="section">
        <div className="container">
          <header className="section-head">
            <h1 className="section-title">Réservations</h1>
            <div className="section-line" />
          </header>

          <div className="card reservation-card">
            <form className="form" onSubmit={onSubmit} noValidate>
              <div className="grid-2">
                <div className="field">
                  <label htmlFor="name">Nom *</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={form.name}
                    onChange={onChange}
                    autoComplete="name"
                    required
                  />
                  {fieldErrors.name && <p className="field-error">{fieldErrors.name}</p>}
                </div>

                <div className="field">
                  <label htmlFor="email">E-mail *</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={onChange}
                    autoComplete="email"
                    required
                  />
                  {fieldErrors.email && <p className="field-error">{fieldErrors.email}</p>}
                </div>

                <div className="field">
                  <label htmlFor="phone">Téléphone</label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={onChange}
                    autoComplete="tel"
                  />
                  {fieldErrors.phone && <p className="field-error">{fieldErrors.phone}</p>}
                </div>

                <div className="field">
                  <label htmlFor="guests">Nombre de personnes *</label>
                  <input
                    id="guests"
                    name="guests"
                    type="number"
                    min={1}
                    max={12}
                    value={form.guests}
                    onChange={onChange}
                    required
                  />
                  {fieldErrors.guests && <p className="field-error">{fieldErrors.guests}</p>}
                </div>

                <div className="field">
                  <label htmlFor="date">Date *</label>
                  <input
                    id="date"
                    name="date"
                    type="date"
                    value={form.date}
                    onChange={onChange}
                    required
                  />
                  {fieldErrors["date/time"] && (
                    <p className="field-error">{fieldErrors["date/time"]}</p>
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
                    required
                  />
                </div>
              </div>

              <div className="field">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={form.message}
                  onChange={onChange}
                />
                {fieldErrors.message && <p className="field-error">{fieldErrors.message}</p>}
              </div>

              <div className="form-actions">
                <button className="btn btn-primary" disabled={status.type === "loading"}>
                  {status.type === "loading" ? "Envoi..." : "Envoyer la demande"}
                </button>

                <NavLink className="btn btn-secondary" to="/carte">
                  Voir la carte
                </NavLink>
              </div>

              {status.type !== "idle" && (
                <div className="card form-status">
                  <p className="form-status-text">{status.message}</p>
                </div>
              )}
            </form>
          </div>

          <p className="muted-note">
            Astuce : le frontend appelle l’API via <code>/api</code> (proxy Vite).
          </p>
        </div>
      </section>
    </main>
  );
}
