import { useAuth } from "../auth/AuthContext.jsx";

export default function Account() {
  const { user, logout } = useAuth();

  return (
    <main className="container section" style={{ maxWidth: 720 }}>
      <h1>Mon compte</h1>

      <p>
        Connecté en tant que <strong>{user?.email}</strong>
      </p>

      <div style={{ marginTop: 16 }}>
        <button onClick={logout} style={{ padding: "10px 14px" }}>
          Se déconnecter
        </button>
      </div>
    </main>
  );
}
