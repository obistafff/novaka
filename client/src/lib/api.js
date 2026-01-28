const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

let csrfToken = null;

// 1️⃣ récupérer le CSRF
export async function apiCsrf() {
  const res = await fetch(`${API_URL}/api/auth/csrf`, {
    method: "GET",
    credentials: "include", // cookies
  });

  if (!res.ok) throw new Error("CSRF fetch failed");

  const token = res.headers.get("X-CSRF-Token");
  if (!token) throw new Error("CSRF token not found");

  csrfToken = token;
  return token;
}

// 2️⃣ fetch générique
async function apiFetch(path, { method = "GET", body } = {}) {
  // Ensure CSRF for non-GET methods
  if (["POST", "PUT", "PATCH", "DELETE"].includes(method) && !csrfToken) {
    await apiCsrf();
  }

  const res = await fetch(`${API_URL}${path}`, {
    method,
    credentials: "include",
    headers: {
      Accept: "application/json",
      ...(body && { "Content-Type": "application/json" }),
      ...(csrfToken && method !== "GET" && { "X-CSRF-Token": csrfToken }),
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  // Refresh CSRF token if backend sends a new one
  const newToken = res.headers.get("X-CSRF-Token");
  if (newToken) csrfToken = newToken;

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    throw new Error(data?.error || `HTTP ${res.status}`);
  }

  return data;
}

// 3️⃣ helpers
export const apiGet = (path) => apiFetch(path);
export const apiPost = (path, body) => apiFetch(path, { method: "POST", body });
export const apiPut = (path, body) => apiFetch(path, { method: "PUT", body });
export const apiPatch = (path, body) => apiFetch(path, { method: "PATCH", body });
export const apiDelete = (path, body) => apiFetch(path, { method: "DELETE", body });
