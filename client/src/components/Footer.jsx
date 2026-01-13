export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-top">
        {/* Brand */}
        <div className="footer-brand">
          <div className="footer-brand-row">
            <img className="footer-logo" src="/img/logo.png" alt="Café Nokava" />
            <div className="footer-name">Nokava</div>
          </div>
          <p className="footer-tagline">L’art du café depuis 2014</p>
        </div>

        {/* Navigation */}
        <div className="footer-col">
          <h4 className="footer-title">Navigation</h4>
          <a className="footer-link" href="/">Accueil</a>
          <a className="footer-link" href="/carte">Notre Carte</a>
          <a className="footer-link" href="/reservation">Réservations</a>
        </div>

        {/* Social */}
        <div className="footer-col">
          <h4 className="footer-title">Suivez-nous</h4>
          <div className="social">
            <a className="social-btn" href="#" aria-label="Instagram">◎</a>
            <a className="social-btn" href="#" aria-label="Facebook">◻</a>
            <a className="social-btn" href="#" aria-label="Twitter">△</a>
          </div>
        </div>

        {/* Contact */}
        <div className="footer-col">
          <h4 className="footer-title">Contact</h4>
          <div className="footer-text">
            93 Boulevard Voltaire<br />
            35000 Rennes
          </div>
          <div className="footer-text">02 99 12 34 56</div>
        </div>
      </div>

      <div className="container footer-bottom">
        <a className="footer-bottom-link" href="/mentions">Mentions légales</a>
        <span className="footer-sep">|</span>
        <a className="footer-bottom-link" href="/confidentialite">Politique de confidentialité</a>
        <span className="footer-sep">|</span>
        <span>© {new Date().getFullYear()} Nokava. Tous droits réservés.</span>
      </div>
    </footer>
  );
}
