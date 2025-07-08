// components/AdminPortal.jsx
import React, { useState, useEffect } from "react";
import LoginScreen from "./LoginScreen";
import Dashboard from "./Dashboard";
import { Notification } from "./Header";
import { adminAPI } from "./adminApi";

const AdminPortal = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authToken, setAuthToken] = useState(localStorage.getItem("authToken"));
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    if (authToken) {
      setIsLoggedIn(true);
    }
  }, [authToken]);

  const showNotification = (message, type = "info") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  const handleLogin = async (loginData) => {
    try {
      const result = await adminAPI.login(loginData);
      setAuthToken(result.token);
      localStorage.setItem("authToken", result.token);
      setIsLoggedIn(true);
      showNotification("🎯 Welcome to Command Center!", "success");
      return { success: true };
    } catch (error) {
      showNotification("❌ Login failed: " + error.message, "error");
      return { success: false, error: error.message };
    }
  };

  const handleLogout = () => {
    setAuthToken(null);
    localStorage.removeItem("authToken");
    setIsLoggedIn(false);
    showNotification("👋 Logged out successfully", "info");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {notification && (
        <Notification message={notification.message} type={notification.type} />
      )}

      {!isLoggedIn ? (
        <LoginScreen onLogin={handleLogin} />
      ) : (
        <Dashboard
          authToken={authToken}
          onLogout={handleLogout}
          showNotification={showNotification}
        />
      )}
    </div>
  );
};

export default AdminPortal;
