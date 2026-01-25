import { Link, NavLink } from "react-router-dom";
import { useState } from "react";

function NavItem({ to, children, end = false }) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        `nav-link${isActive ? " active" : ""}`
      }
    >
      {children}
    </NavLink>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);

  // ✅ Header "safe": pas de hook panier ici.
  // Tu pourras rebrancher un count plus tard via props ou context quand tout sera prêt.
  const cartCount = 0;

  return (
    <header className="site-header">
      <div className="container header-inner">
        {/* Brand */}
        <Link className="brand" to="/" onClick={() => setOpen(false)}>
          <span className="brand-mark" aria-hidden="true">☕</span>
          <span className="brand-text">Nokava</span>
        </Link>

        {/* Burger (mobile) */}
        <button
          type="button"
          className="nav-toggle"
          aria-label="Toggle navigation"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          ☰
        </button>

        {/* Nav */}
        <nav className={`nav ${open ? "open" : ""}`}>
          <div className="nav-left">
            <NavItem to="/" end>Accueil</NavItem>
            <NavItem to="/carte">Carte</NavItem>
            <NavItem to="/boutique">Boutique</NavItem>
          </div>

          <div className="nav-right">
            <NavItem to="/login">Se connecter</NavItem>

            <NavLink
              to="/panier"
              className={({ isActive }) =>
                `nav-link${isActive ? " active" : ""}`
              }
              onClick={() => setOpen(false)}
            >
              Panier
              {cartCount > 0 && <span className="badge">{cartCount}</span>}
            </NavLink>

            <NavLink
              to="/admin/orders"
              className={({ isActive }) =>
                `nav-link nav-link--admin${isActive ? " active" : ""}`
              }
              onClick={() => setOpen(false)}
            >
              Admin
            </NavLink>
          </div>
        </nav>
      </div>
    </header>
  );
}
