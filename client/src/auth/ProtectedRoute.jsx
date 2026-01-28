import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext.jsx";

export default function ProtectedRoute({ children, role }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  // ✅ Pendant qu'on vérifie /me, on affiche quelque chose
  if (loading) {
    return (
      <main className="container section">
        <p>Vérification de session…</p>
      </main>
    );
  }

  // ✅ Pas connecté -> login + on garde la destination
  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // ✅ Optionnel: contrôle de rôle
  if (role && user.role !== role) {
    return (
      <main className="container section">
        <p>Accès refusé.</p>
      </main>
    );
  }

  return children;
}
