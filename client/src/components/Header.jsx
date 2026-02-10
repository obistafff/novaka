import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../auth/AuthContext.jsx";
import { useEffect, useState } from "react";
import { cartCount, CART_UPDATED_EVENT } from "../lib/cartStorage.js";

export default function Header() {
  const { user } = useAuth();
  const [count, setCount] = useState(cartCount());
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const sync = () => setCount(cartCount());
    window.addEventListener("storage", sync);
    window.addEventListener(CART_UPDATED_EVENT, sync);
    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener(CART_UPDATED_EVENT, sync);
    };
  }, []);

  const close = () => setOpen(false);

  return (
    <header className="site-header">
      <div className="container header-inner">
        {/* Logo (same as footer) */}
        <Link to="/" className="brand" onClick={close}>
          <img className="header-logo" src="/img/logo.png" alt="Nokava" />
        </Link>

        {/* Mobile toggle */}
        <button
          className="nav-toggle"
          aria-label="Menu"
          aria-expanded={open ? "true" : "false"}
          onClick={() => setOpen((v) => !v)}
        >
          Menu
        </button>

        <nav className={`nav ${open ? "open" : ""}`}>
          <div className="nav-left">
            <NavLink to="/" end className="nav-link" onClick={close}>
              Accueil
            </NavLink>
            <NavLink to="/carte" className="nav-link" onClick={close}>
              Carte
            </NavLink>
            <NavLink to="/boutique" className="nav-link" onClick={close}>
              Boutique
            </NavLink>
            <NavLink to="/reservation" className="nav-link" onClick={close}>
              Réservation
            </NavLink>
          </div>

          <div className="nav-right">
            <NavLink to="/panier" className="nav-link" onClick={close}>
              Panier {count > 0 && <span className="badge">{count}</span>}
            </NavLink>

            {!user && (
              <NavLink to="/login" className="nav-link" onClick={close}>
                Se connecter
              </NavLink>
            )}

            {user && (
              <>
                {user.role === "admin" && (
                  <NavLink to="/admin/orders" className="nav-link" onClick={close}>
                    Admin
                  </NavLink>
                )}
                <NavLink to="/account" className="nav-link" onClick={close}>
                  Mon compte
                </NavLink>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
