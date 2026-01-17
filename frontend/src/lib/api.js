const API_BASE = import.meta.env.VITE_API_URL;

export async function getSessions() {
    return fetch(`${API_BASE}/api/sessions`, {
        credentials: "include",
    });
}