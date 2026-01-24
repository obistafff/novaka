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
              <a className="btn btn-primary" href="#reservation">Réserver</a>
              <a className="btn btn-secondary" href="#carte">Voir la carte</a>
            </div>
          </div>

          <div className="hero-media card">
            {/* Remplace hero.jpg par un vrai nom dans /public/img */}
            <img className="hero-img" src="/img/hero.jpg" alt="Café Nokava" />
          </div>
        </div>
      </section>

      {/* QUICK LINKS */}
      <section className="section">
        <div className="container">
          <div className="grid-3">
            <a className="quick-card card" href="#reservation">
              <img className="quick-img" src="/img/reserver.jpg" alt="" />
              <h3 className="quick-title">Réserver</h3>
            </a>

            <a className="quick-card card" href="#boutique">
              <img className="quick-img" src="/img/boutique.jpg" alt="" />
              <h3 className="quick-title">Boutique</h3>
            </a>

            <a className="quick-card card" href="#carte">
              <img className="quick-img" src="/img/carte.jpg" alt="" />
              <h3 className="quick-title">Notre carte</h3>
            </a>
          </div>
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
                  <span className="info-icon" aria-hidden="true">📍</span>
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
                  <span className="info-icon" aria-hidden="true">🕒</span>
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
                  <span className="info-icon" aria-hidden="true">📞</span>
                  <div>
                    <h3 className="info-label">Téléphone</h3>
                    <p className="info-text">
                      <a className="info-link" href="tel:+33299123456">02 99 12 34 56</a>
                    </p>
                  </div>
                </div>
              </article>

              <article className="info-card card">
                <div className="info-row">
                  <span className="info-icon" aria-hidden="true">✉️</span>
                  <div>
                    <h3 className="info-label">E-mail</h3>
                    <p className="info-text">
                      <a className="info-link" href="mailto:contact@nokava.fr">contact@nokava.fr</a>
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
                <li><span aria-hidden="true">🚇</span> <strong>Métro</strong> : Ligne A - Station Voltaire (2 min à pied)</li>
                <li><span aria-hidden="true">🚌</span> <strong>Bus</strong> : Lignes 12, 15 - Arrêt Voltaire</li>
                <li><span aria-hidden="true">🚗</span> <strong>Parking</strong> : Parking Voltaire (50m)</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      
      {/* PHILOSOPHY */}
      <section className="section philosophy">
        <div className="container">
          <header className="section-head">
            <h2 className="section-title">Notre Philosophie</h2>
            <div className="section-line" />
          </header>

          <div className="grid-3">
            <article className="philo-card card">
              <div className="philo-emoji">🌱</div>
              <h3>Durable & Responsable</h3>
              <p>
                Nous nous engageons pour un café éthique en privilégiant des pratiques
                respectueuses de l’environnement.
              </p>
            </article>

            <article className="philo-card card">
              <div className="philo-emoji">🏠</div>
              <h3>Local & Artisanal</h3>
              <p>
                Pâtisseries préparées chaque matin, fournisseurs choisis localement
                quand c’est possible.
              </p>
            </article>

            <article className="philo-card card">
              <div className="philo-emoji">☕</div>
              <h3>Convivial & Chaleureux</h3>
              <p>
                Un lieu de rencontre et d’échange : seul pour lire, entre amis, ou
                pour travailler dans une ambiance douce.
              </p>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}
