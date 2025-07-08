// components/Dashboard.jsx
import React, { useState, useEffect } from "react";
import { BarChart3, Users, Calendar, LogOut } from "lucide-react";
import { Header } from "./Header";
import { OverviewTab } from "./Header";
import { TeamsTab } from "./Header";
import { FixturesTab } from "./FixturesTab";

const Dashboard = ({ authToken, onLogout, showNotification }) => {
  const [currentTab, setCurrentTab] = useState("overview");
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const tabs = [
    { id: "overview", label: "📊 OVERVIEW", icon: BarChart3 },
    { id: "teams", label: "👥 TEAMS", icon: Users },
    { id: "fixtures", label: "⚔️ FIXTURES", icon: Calendar },
  ];

  return (
    <div className="min-h-screen">
      <Header currentTime={currentTime} onLogout={onLogout} />

      {/* Navigation Tabs */}
      <nav className="container mx-auto px-6 py-4">
        <div className="flex space-x-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setCurrentTab(tab.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-bold transition-all duration-300 ${
                currentTab === tab.id
                  ? "bg-blue-600/80 shadow-lg shadow-blue-500/30"
                  : "bg-gray-600/80 hover:bg-gray-500/80"
              }`}
            >
              <tab.icon className="w-5 h-5" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* Tab Content */}
      <div className="container mx-auto px-6 py-8">
        {currentTab === "overview" && (
          <OverviewTab
            authToken={authToken}
            showNotification={showNotification}
          />
        )}

        {currentTab === "teams" && (
          <TeamsTab authToken={authToken} showNotification={showNotification} />
        )}

        {currentTab === "fixtures" && (
          <FixturesTab
            authToken={authToken}
            showNotification={showNotification}
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
