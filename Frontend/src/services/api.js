const API_BASE = "http://localhost:5000"; // change to your backend
const CURRENT_USER_ID = "123"; // replace with auth user id

const api = {
  async getSelectedTreatments() {
    const res = await fetch(`${API_BASE}/users/${CURRENT_USER_ID}/treatments`, {
      credentials: "include",
    });
    if (!res.ok) throw new Error("Failed to fetch treatments");
    return res.json();
  },
  async postTreatment(payload) {
    const res = await fetch(`${API_BASE}/users/${CURRENT_USER_ID}/treatments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error("Failed to save treatment");
    return res.json();
  },
  async deleteTreatment(id) {
    const res = await fetch(`${API_BASE}/users/${CURRENT_USER_ID}/treatments/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    if (!res.ok) throw new Error("Failed to remove treatment");
    return { id };
  },
};

export default api;
