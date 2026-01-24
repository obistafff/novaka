import Home from "../pages/Home";
import Carte from "../pages/Carte";
import Reservation from "../pages/Reservation";

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

  { path: "/boutique", element: <Placeholder title="Boutique" /> },
  { path: "/reservation", element: <Reservation /> },
  { path: "/login", element: <Placeholder title="Se connecter" /> },
  { path: "/panier", element: <Placeholder title="Panier" /> },

  // 404
  { path: "*", element: <Placeholder title="Page introuvable" /> },
];
