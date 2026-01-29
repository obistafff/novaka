import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { apiCsrf, apiGet, apiPost } from "../lib/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check current session
  async function refresh() {
    try {
      await apiCsrf();
      const data = await apiGet("/api/auth/me");
      setUser(data.user);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  async function login(email, password) {
    await apiCsrf();
    await apiPost("/api/auth/login", { email, password });

    // IMPORTANT: /login ne renvoie pas role -> on récupère le user complet via /me
    const me = await apiGet("/api/auth/me");
    setUser(me.user);
    return me.user;
  }

  async function logout() {
    try {
      await apiCsrf();
      await apiPost("/api/auth/logout");
    } finally {
      setUser(null);
    }
  }

  useEffect(() => {
    refresh();
  }, []);

  const value = useMemo(
    () => ({
      user,
      loading,
      isAuthenticated: !!user,
      login,
      logout,
      refresh,
    }),
    [user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
}
