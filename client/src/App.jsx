import { NavLink, Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";
import AdminOrders from "./pages/AdminOrders.jsx";

function Layout({ children }) {
  return (
    <div className="app">
      <header className="container" style={{ padding: "16px 0" }}>
        <nav style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <NavLink
            to="/"
            end
            style={({ isActive }) => ({
              textDecoration: "none",
              color: "inherit",
              fontWeight: isActive ? 700 : 500,
            })}
          >
            Nokava
          </NavLink>

          <NavLink
            to="/admin/orders"
            style={({ isActive }) => ({
              textDecoration: "none",
              color: "inherit",
              opacity: isActive ? 1 : 0.8,
              fontWeight: isActive ? 700 : 500,
            })}
          >
            Admin · Orders
          </NavLink>
        </nav>
      </header>

      {children}

      <footer className="container" style={{ padding: "24px 0", color: "var(--color-muted)" }}>
        <small>© {new Date().getFullYear()} Nokava</small>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout>
            <Home />
          </Layout>
        }
      />
      <Route
        path="/admin/orders"
        element={
          <Layout>
            <AdminOrders />
          </Layout>
        }
      />
      <Route
        path="*"
        element={
          <Layout>
            <main className="container section">
              <p>Page introuvable.</p>
            </main>
          </Layout>
        }
      />
    </Routes>
  );
}
