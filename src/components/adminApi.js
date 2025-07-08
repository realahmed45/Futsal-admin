// services/adminAPI.js
const API_BASE_URL = "http://localhost:5000/api";

export const adminAPI = {
  // Authentication
  login: async (loginData) => {
    const response = await fetch(`${API_BASE_URL}/admin/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Login failed");
    }

    return response.json();
  },

  // Dashboard stats
  getStats: async (authToken) => {
    const response = await fetch(`${API_BASE_URL}/admin/stats`, {
      headers: { Authorization: `Bearer ${authToken}` },
    });

    if (!response.ok) {
      throw new Error("Failed to load stats");
    }

    return response.json();
  },

  // Teams management
  getTeams: async (authToken) => {
    const response = await fetch(`${API_BASE_URL}/admin/teams`, {
      headers: { Authorization: `Bearer ${authToken}` },
    });

    if (!response.ok) {
      throw new Error("Failed to load teams");
    }

    return response.json();
  },

  updateTeamStatus: async (authToken, teamId, status, paymentVerified) => {
    const response = await fetch(
      `${API_BASE_URL}/admin/teams/${teamId}/status`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({ status, paymentVerified }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update team status");
    }

    return response.json();
  },

  // Fixtures management
  getPendingFixtures: async (authToken) => {
    const response = await fetch(`${API_BASE_URL}/admin/fixtures/pending`, {
      headers: { Authorization: `Bearer ${authToken}` },
    });

    if (!response.ok) {
      throw new Error("Failed to load pending fixtures");
    }

    return response.json();
  },

  getApprovedFixtures: async () => {
    const response = await fetch(`${API_BASE_URL}/fixtures/approved`);

    if (!response.ok) {
      throw new Error("Failed to load approved fixtures");
    }

    return response.json();
  },

  generateFixtures: async (authToken) => {
    const response = await fetch(`${API_BASE_URL}/admin/fixtures/generate`, {
      method: "POST",
      headers: { Authorization: `Bearer ${authToken}` },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to generate fixtures");
    }

    return response.json();
  },

  approveFixture: async (authToken, fixtureId) => {
    const response = await fetch(
      `${API_BASE_URL}/admin/fixtures/${fixtureId}/approve`,
      {
        method: "PATCH",
        headers: { Authorization: `Bearer ${authToken}` },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to approve fixture");
    }

    return response.json();
  },

  deleteFixture: async (authToken, fixtureId) => {
    const response = await fetch(
      `${API_BASE_URL}/admin/fixtures/${fixtureId}`,
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${authToken}` },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to delete fixture");
    }

    return response.json();
  },
};
