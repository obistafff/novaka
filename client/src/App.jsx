import { Route, Routes } from "react-router-dom";
import Header from "./components/Header.jsx";

import Home from "./pages/Home.jsx";
import AdminOrders from "./pages/AdminOrders.jsx";

function Layout({ children }) {
  return (
    <div className="app">
      <Header />

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
