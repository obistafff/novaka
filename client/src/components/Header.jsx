import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext.jsx";
import { useEffect, useState } from "react";
import { cartCount, CART_UPDATED_EVENT } from "../lib/cartStorage.js";

export default function Header() {
  const { user } = useAuth();
  const [count, setCount] = useState(cartCount());

  useEffect(() => {
    function syncCart() {
      setCount(cartCount());
    }

    // autres onglets
    window.addEventListener("storage", syncCart);
    // même onglet
    window.addEventListener(CART_UPDATED_EVENT, syncCart);

    return () => {
      window.removeEventListener("storage", syncCart);
      window.removeEventListener(CART_UPDATED_EVENT, syncCart);
    };
  }, []);

  return (
    <header style={{ borderBottom: "1px solid #eee" }}>
      <div
        className="container"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px 0",
        }}
      >
        {/* Left: main nav */}
        <nav style={{ display: "flex", gap: 16, alignItems: "center" }}>
          <Link to="/">NovaKa</Link>
          <Link to="/carte">Carte</Link>
          <Link to="/boutique">Boutique</Link>
          <Link to="/reservation">Réservation</Link>
        </nav>

        {/* Right: cart + auth */}
        <nav style={{ display: "flex", gap: 16, alignItems: "center" }}>
          <Link to="/panier" style={{ position: "relative" }}>
            Panier
            {count > 0 && (
              <span
                style={{
                  position: "absolute",
                  top: -6,
                  right: -10,
                  background: "crimson",
                  color: "white",
                  borderRadius: "999px",
                  padding: "2px 6px",
                  fontSize: 12,
                  lineHeight: 1,
                }}
              >
                {count}
              </span>
            )}
          </Link>

          {!user && <Link to="/login">Se connecter</Link>}

          {user && (
            <>
              {user.role === "admin" && <Link to="/admin/orders">Admin</Link>}
              <Link to="/account">Mon compte</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
