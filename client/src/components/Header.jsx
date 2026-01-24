import { Link, NavLink } from "react-router-dom";
import { useCartCount } from "../hooks/useCartCount.js";

export default function Header() {
  const count = useCartCount();

  return (
    <header className="site-header">
      <div className="container header-inner">
        {/* Left: logo */}
        <Link className="brand" to="/">
          <img
            className="brand-logo"
            src="/img/logo.png"
            alt="Café Nokava"
          />
        </Link>

        {/* Center: nav */}
        <nav className="nav">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `nav-link${isActive ? " active" : ""}`
            }
          >
            accueil
          </NavLink>

          <NavLink
            to="/carte"
            className={({ isActive }) =>
              `nav-link${isActive ? " active" : ""}`
            }
          >
            carte
          </NavLink>

          <NavLink
            to="/boutique"
            className={({ isActive }) =>
              `nav-link${isActive ? " active" : ""}`
            }
          >
            boutique
          </NavLink>
        </nav>

        {/* Right: actions */}
        <div className="header-actions">
          <NavLink
            to="/login"
            className={({ isActive }) =>
              `nav-link${isActive ? " active" : ""}`
            }
          >
            se connecter
          </NavLink>

          <NavLink
            to="/panier"
            className={({ isActive }) =>
              `nav-link${isActive ? " active" : ""}`
            }
          >
            panier
            {count > 0 && <span className="badge">{count}</span>}
          </NavLink>
        </div>
      </div>
    </header>
  );
}
