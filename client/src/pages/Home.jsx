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
