export default function Home() {
  return (
    <main>
      {/* HERO */}
      <section className="section hero">
        <div className="container hero-grid">
          <div className="hero-text">
            <h1 className="hero-title">Café Nokava</h1>
            <p className="hero-subtitle">L’arôme du partage</p>

            <div className="hero-actions">
              <a className="btn btn-primary" href="/reservation">Réserver</a>
              <a className="btn btn-secondary" href="/carte">Voir la carte</a>
              <a className="btn btn-secondary" href="/boutique">Boutique</a>
            </div>
          </div>

          <div className="hero-media card">
            <img className="hero-img" src="/img/img1.jpg" alt="Café Nokava" />
          </div>
        </div>
      </section>

      {/* NOTRE HISTOIRE */}
      <section className="section">
        <div className="container">
          <header className="section-head">
            <h2 className="section-title">Notre Histoire</h2>
            <div className="section-line" />
          </header>

          <p
            style={{
              maxWidth: "720px",
              margin: "0 auto",
              textAlign: "center",
              color: "var(--color-muted)",
              fontSize: "1.05rem",
              lineHeight: "1.8",
            }}
          >
            Nichés au cœur de la ville, nous avons créé Nokava comme un lieu de rencontre
            authentique où la passion du café se mélange à la chaleur humaine. Chaque tasse
            raconte une histoire, chaque grain est sélectionné avec soin pour vous offrir
            une expérience gustative unique.
          </p>
        </div>
      </section>

      {/* INFOS PRATIQUES */}
      <section className="section infos">
        <div className="container infos-grid">
          {/* LEFT */}
          <div className="infos-left">
            <header className="infos-head">
              <h2 className="infos-title">Infos Pratiques</h2>
              <div className="infos-line" />
            </header>

            <div className="infos-cards">
              <article className="info-card card">
                <div className="info-row">
                  <div>
                    <h3 className="info-label">Adresse</h3>
                    <p className="info-text">
                      93 Boulevard Voltaire<br />
                      35000 Rennes
                    </p>
                  </div>
                </div>
              </article>

              <article className="info-card card">
                <div className="info-row">
                  <div>
                    <h3 className="info-label">Horaires</h3>
                    <p className="info-text">
                      <strong>Lundi - Vendredi</strong> : 7h00 - 19h00<br />
                      <strong>Samedi</strong> : 8h00 - 20h00<br />
                      <strong>Dimanche</strong> : 9h00 - 18h00
                    </p>
                  </div>
                </div>
              </article>

              <article className="info-card card">
                <div className="info-row">
                  <div>
                    <h3 className="info-label">Téléphone</h3>
                    <p className="info-text">
                      <a className="info-link" href="tel:+33299123456">
                        02 99 12 34 56
                      </a>
                    </p>
                  </div>
                </div>
              </article>

              <article className="info-card card">
                <div className="info-row">
                  <div>
                    <h3 className="info-label">E-mail</h3>
                    <p className="info-text">
                      <a className="info-link" href="mailto:contact@nokava.fr">
                        contact@nokava.fr
                      </a>
                    </p>
                  </div>
                </div>
              </article>
            </div>
          </div>

          {/* RIGHT */}
          <div className="infos-right">
            <header className="infos-head">
              <h2 className="infos-title">Nous Trouver</h2>
              <div className="infos-line" />
            </header>

            <div className="map-card card">
              <iframe
                className="map-embed"
                title="Google Maps - Café Nokava"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.google.com/maps?q=93%20Bd%20Voltaire%2035000%20Rennes&output=embed"
              />
            </div>

            <div className="access-card card">
              <ul className="access-list">
                <li><strong>Métro</strong> : Ligne A - Station Voltaire (2 min à pied)</li>
                <li><strong>Bus</strong> : Lignes 12, 15 - Arrêt Voltaire</li>
                <li><strong>Parking</strong> : Parking Voltaire (50m)</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* PHILOSOPHIE */}
      <section className="section philosophy">
        <div className="container">
          <header className="section-head">
            <h2 className="section-title">Notre Philosophie</h2>
            <div className="section-line" />
          </header>

          <div className="grid-3">
            {/* DURABLE */}
            <article className="philo-card card" style={{ paddingTop: "0" }}>
              <div
                style={{
                  textAlign: "center",
                  padding: "18px 16px 14px",
                  background: "rgba(122, 74, 46, 0.06)",
                  borderRadius: "16px 16px 0 0",
                }}
              >
                <h3 style={{ margin: 0 }}>Durable & Responsable</h3>
                <div
                  style={{
                    width: "36px",
                    height: "3px",
                    background: "var(--color-primary)",
                    borderRadius: "999px",
                    margin: "10px auto 0",
                  }}
                />
              </div>

              <img
                src="/img/philo-durable.jpg"
                alt="Engagement durable"
                style={{
                  width: "100%",
                  height: "180px",
                  objectFit: "cover",
                  marginTop: "16px",
                  borderRadius: "12px",
                }}
              />

              <p style={{ marginTop: "16px" }}>
                Nous nous engageons pour un café éthique en privilégiant des pratiques
                respectueuses de l’environnement, de la culture à la torréfaction.
              </p>
            </article>

            {/* LOCAL */}
            <article className="philo-card card" style={{ paddingTop: "0" }}>
              <div
                style={{
                  textAlign: "center",
                  padding: "18px 16px 14px",
                  background: "rgba(122, 74, 46, 0.06)",
                  borderRadius: "16px 16px 0 0",
                }}
              >
                <h3 style={{ margin: 0 }}>Local & Artisanal</h3>
                <div
                  style={{
                    width: "36px",
                    height: "3px",
                    background: "var(--color-primary)",
                    borderRadius: "999px",
                    margin: "10px auto 0",
                  }}
                />
              </div>

              <img
                src="/img/philo-local.jpg"
                alt="Produits locaux"
                style={{
                  width: "100%",
                  height: "180px",
                  objectFit: "cover",
                  marginTop: "16px",
                  borderRadius: "12px",
                }}
              />

              <p style={{ marginTop: "16px" }}>
                Pâtisseries préparées chaque matin, produits faits maison et partenaires
                locaux choisis avec soin.
              </p>
            </article>

            {/* CONVIVIAL */}
            <article className="philo-card card" style={{ paddingTop: "0" }}>
              <div
                style={{
                  textAlign: "center",
                  padding: "18px 16px 14px",
                  background: "rgba(122, 74, 46, 0.06)",
                  borderRadius: "16px 16px 0 0",
                }}
              >
                <h3 style={{ margin: 0 }}>Convivial & Chaleureux</h3>
                <div
                  style={{
                    width: "36px",
                    height: "3px",
                    background: "var(--color-primary)",
                    borderRadius: "999px",
                    margin: "10px auto 0",
                  }}
                />
              </div>

              <img
                src="/img/philo-convivial.jpg"
                alt="Ambiance conviviale"
                style={{
                  width: "100%",
                  height: "180px",
                  objectFit: "cover",
                  marginTop: "16px",
                  borderRadius: "12px",
                }}
              />

              <p style={{ marginTop: "16px" }}>
                Un lieu de rencontre et d’échange : seul pour lire, entre amis,
                ou pour travailler dans une ambiance douce.
              </p>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}
