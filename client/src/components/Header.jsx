export default function Header() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        {/* Left: logo */}
        <a className="brand" href="/">
          {/* remplace logo.png par ton vrai nom dans /public/img */}
          <img className="brand-logo" src="/img/logo.png" alt="Café Nokava" />
        </a>

        {/* Center: nav */}
        <nav className="nav">
          <a className="nav-link" href="/">accueil</a>
          <a className="nav-link" href="/carte">carte</a>
          <a className="nav-link" href="/boutique">boutique</a>
        </nav>

        {/* Right: actions */}
        <div className="header-actions">
          <a className="nav-link" href="/login">se connecter</a>
          <a className="nav-link" href="/panier">panier</a>
        </div>
      </div>
    </header>
  );
}
