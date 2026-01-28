import { Route, Routes } from "react-router-dom";

import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";

import Home from "./pages/Home.jsx";
import Carte from "./pages/Carte.jsx";
import Boutique from "./pages/Boutique.jsx";
import Panier from "./pages/Panier.jsx";
import Reservation from "./pages/Reservation.jsx";
import AdminOrders from "./pages/AdminOrders.jsx";
import Login from "./pages/Login.jsx";

import ProtectedRoute from "./auth/ProtectedRoute.jsx";

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

      <Route
        path="/admin/orders"
        element={
          <ProtectedRoute>
            <Layout><AdminOrders /></Layout>
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Layout><NotFound /></Layout>} />
    </Routes>
  );
}
