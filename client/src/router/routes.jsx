import Home from "../pages/Home";
import Carte from "../pages/Carte";
import Reservation from "../pages/Reservation";
import Boutique from "../pages/Boutique";
import Panier from "../pages/Panier";

// Pages pas encore faites : placeholders temporaires
function Placeholder({ title }) {
  return (
    <main className="section">
      <div className="container">
        <h1 style={{ margin: 0 }}>{title}</h1>
        <p style={{ marginTop: 8, color: "var(--color-muted)" }}>
          Page en cours de création.
        </p>
      </div>
    </main>
  );
}

export const routes = [
  { path: "/", element: <Home /> },
  { path: "/carte", element: <Carte /> },

  { path: "/boutique", element: <Boutique /> },
  { path: "/reservation", element: <Reservation /> },
  { path: "/panier", element: <Panier /> },

  { path: "/login", element: <Placeholder title="Se connecter" /> },

  // 404
  { path: "*", element: <Placeholder title="Page introuvable" /> },
];

