import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext.jsx";

export default function Login() {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // ✅ Redirect dès que user est dispo (après /me)
  useEffect(() => {
    if (!user) return;

    const wantsAdmin = from.startsWith("/admin");
    const isAdmin = user.role === "admin";

    // Si le user voulait une page admin mais n'est pas admin -> account
    if (wantsAdmin && !isAdmin) {
      navigate("/account", { replace: true });
      return;
    }

    // Optionnel : si l'admin vient juste de /login sans destination -> admin direct
    if (isAdmin && from === "/") {
      navigate("/admin/orders", { replace: true });
      return;
    }

    // Sinon on respecte la destination demandée
    navigate(from, { replace: true });
  }, [user, from, navigate]);

  async function onSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      await login(email, password);
      // Pas de navigate ici : l'useEffect redirige quand user est mis à jour
    } catch (e) {
      setError(e?.message || "Login failed");
    }
  }

  return (
    <div style={{ padding: 24, maxWidth: 420 }}>
      <h1>Se connecter</h1>

      {error && <p style={{ color: "crimson" }}>{error}</p>}

      <form onSubmit={onSubmit}>
        <label style={{ display: "block", marginBottom: 6 }}>Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: "100%", padding: 10, marginBottom: 12 }}
          placeholder="email"
          autoComplete="email"
        />

        <label style={{ display: "block", marginBottom: 6 }}>Mot de passe</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: "100%", padding: 10, marginBottom: 16 }}
          placeholder="password"
          type="password"
          autoComplete="current-password"
        />

        <button type="submit" style={{ padding: "10px 14px" }}>
          Login
        </button>
      </form>
    </div>
  );
}
