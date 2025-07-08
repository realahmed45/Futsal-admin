// components/LoginScreen.jsx
import React, { useState } from "react";

const LoginScreen = ({ onLogin }) => {
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoggingIn(true);

    const result = await onLogin(loginData);

    if (!result.success) {
      setIsLoggingIn(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      {/* Matrix Background Effect */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          >
            <div className="text-green-400/20 text-xl font-mono">
              {["⚽", "🏆", "🎯", "⚡", "🔥"][Math.floor(Math.random() * 5)]}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-black/20 backdrop-blur-xl p-12 rounded-3xl max-w-md w-full border-2 border-red-500/30 shadow-2xl shadow-red-500/20 relative z-10">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4 animate-bounce">🎯</div>
          <h1 className="text-4xl font-black mb-2 bg-gradient-to-r from-red-400 to-orange-500 bg-clip-text text-transparent">
            COMMAND CENTER
          </h1>
          <p className="text-lg text-gray-300">Liga Futsoul 2025 Management</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-cyan-400">
              USERNAME
            </label>
            <input
              type="text"
              value={loginData.username}
              onChange={(e) =>
                setLoginData({ ...loginData, username: e.target.value })
              }
              required
              className="w-full px-4 py-3 bg-black/50 border border-cyan-500/50 rounded-lg text-white focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300"
              placeholder="Enter username"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-cyan-400">
              PASSWORD
            </label>
            <input
              type="password"
              value={loginData.password}
              onChange={(e) =>
                setLoginData({ ...loginData, password: e.target.value })
              }
              required
              className="w-full px-4 py-3 bg-black/50 border border-cyan-500/50 rounded-lg text-white focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300"
              placeholder="Enter password"
            />
          </div>

          <button
            type="submit"
            disabled={isLoggingIn}
            className="w-full bg-gradient-to-r from-red-600 to-orange-600 py-3 rounded-lg font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-red-500/30 disabled:opacity-50"
          >
            {isLoggingIn ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                <span>Authenticating...</span>
              </div>
            ) : (
              "🔐 ACCESS SYSTEM"
            )}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-400"></div>
      </div>
    </div>
  );
};

export default LoginScreen;
