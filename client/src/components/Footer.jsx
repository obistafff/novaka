import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-top">
        {/* Brand */}
        <div className="footer-brand">
          <div className="footer-brand-row">
            <img className="footer-logo" src="/img/logo.png" alt="NovaKa" />
            <div className="footer-name">NovaKa</div>
          </div>
          <p className="footer-tagline">L’art du café depuis 2014</p>
        </div>

        {/* Navigation */}
        <div className="footer-col">
          <h4 className="footer-title">Navigation</h4>
          <Link className="footer-link" to="/">Accueil</Link>
          <Link className="footer-link" to="/carte">Notre carte</Link>
          <Link className="footer-link" to="/boutique">Boutique</Link>
          <Link className="footer-link" to="/reservation">Réservations</Link>
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
        <Link className="footer-bottom-link" to="/mentions">
          Mentions légales
        </Link>
        <span className="footer-sep">|</span>
        <Link className="footer-bottom-link" to="/confidentialite">
          Politique de confidentialité
        </Link>
        <span className="footer-sep">|</span>
        <span>© {new Date().getFullYear()} NovaKa</span>
      </div>
    </footer>
  );
}
