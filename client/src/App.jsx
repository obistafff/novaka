import { useState } from "react";
import { Route, Routes } from "react-router-dom";

import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";

import Home from "./pages/Home.jsx";
import Carte from "./pages/Carte.jsx";
import Boutique from "./pages/Boutique.jsx";
import Panier from "./pages/Panier.jsx";
import Reservation from "./pages/Reservation.jsx";
import AdminOrders from "./pages/AdminOrders.jsx";

import { apiPost, apiGet } from "./lib/api.js";

/* ------------------------- */
/* Layout                    */
/* ------------------------- */

function Layout({ children }) {
  return (
    <div className="app">
      <Header />
      {children}
      <Footer />
    </div>
  );
}

/* ------------------------- */
/* Pages utilitaires         */
/* ------------------------- */

function NotFound() {
  return (
    <main className="container section">
      <p>Page introuvable.</p>
    </main>
  );
}

/* ------------------------- */
/* Login page (temporaire)   */
/* ------------------------- */

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    setMsg("Connexion...");

    try {
      await apiPost("/api/auth/login", { email, password });
      const me = await apiGet("/api/auth/me");
      setMsg(`Connecté : ${me.user.email}`);
    } catch (err) {
      setMsg(err.message || "Erreur");
    }
  }

  async function handleMe() {
    setMsg("Vérification session...");
    try {
      const me = await apiGet("/api/auth/me");
      setMsg(`Session active : ${me.user.email}`);
    } catch (err) {
      setMsg("Non connecté");
    }
  }

  async function handleLogout() {
    setMsg("Déconnexion...");
    try {
      await apiPost("/api/auth/logout", {});
      setMsg("Déconnecté.");
    } catch (err) {
      setMsg("Erreur logout");
    }
  }

  return (
    <main className="container section">
      <h1 style={{ marginTop: 0 }}>Se connecter</h1>

      <form
        onSubmit={handleLogin}
        style={{ maxWidth: 420, display: "grid", gap: 12 }}
      >
        <label>
          Email
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>

        <label>
          Mot de passe
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        <button type="submit">Login</button>

        <div style={{ display: "flex", gap: 8 }}>
          <button type="button" onClick={handleMe}>
            /me
          </button>
          <button type="button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </form>

      {msg && <p style={{ marginTop: 12 }}>{msg}</p>}
    </main>
  );
}

/* ------------------------- */
/* App                       */
/* ------------------------- */

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout><Home /></Layout>} />
      <Route path="/carte" element={<Layout><Carte /></Layout>} />
      <Route path="/boutique" element={<Layout><Boutique /></Layout>} />
      <Route path="/panier" element={<Layout><Panier /></Layout>} />
      <Route path="/reservation" element={<Layout><Reservation /></Layout>} />
      <Route path="/login" element={<Layout><Login /></Layout>} />
      <Route path="/admin/orders" element={<Layout><AdminOrders /></Layout>} />
      <Route path="*" element={<Layout><NotFound /></Layout>} />
    </Routes>
  );
}
