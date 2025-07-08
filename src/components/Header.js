// components/Header.jsx
import React, { useState, useEffect } from "react";
// components/TeamsTab.jsx
import { Eye, X } from "lucide-react";
import { TeamModal } from "./FixturesTab";
import { LogOut } from "lucide-react";
import {
  Users,
  Clock,
  Check,
  DollarSign,
  Shuffle,
  RefreshCw,
} from "lucide-react";
import { adminAPI } from "./adminApi";
const Header = ({ currentTime, onLogout }) => {
  return (
    <header className="bg-black/20 backdrop-blur-xl border-b border-red-500/20 sticky top-0 z-40">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="text-3xl font-black bg-gradient-to-r from-red-400 to-orange-500 bg-clip-text text-transparent">
              🎯 COMMAND CENTER
            </div>
            <div className="text-yellow-400 font-bold">2025</div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-cyan-400 font-bold font-mono">
              {currentTime.toLocaleDateString()}{" "}
              {currentTime.toLocaleTimeString()}
            </div>
            <button
              onClick={onLogout}
              className="flex items-center space-x-2 bg-red-600/80 px-4 py-2 rounded-lg font-bold hover:bg-red-500 transition-all duration-300"
            >
              <LogOut className="w-4 h-4" />
              <span>LOGOUT</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

// components/OverviewTab.jsx

const OverviewTab = ({ authToken, showNotification }) => {
  const [stats, setStats] = useState({});

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const data = await adminAPI.getStats(authToken);
      setStats(data);
    } catch (error) {
      showNotification("❌ Failed to load dashboard data", "error");
    }
  };

  const handleGenerateFixtures = async () => {
    try {
      await adminAPI.generateFixtures(authToken);
      showNotification("🎲 Fixtures generated successfully!", "success");
    } catch (error) {
      showNotification(
        "❌ Failed to generate fixtures: " + error.message,
        "error"
      );
    }
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white/5 backdrop-blur-xl p-6 rounded-2xl border border-green-500/30 shadow-lg shadow-green-500/10">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold font-mono">
                {stats.totalTeams || 0}
              </div>
              <div className="text-sm text-gray-300">Total Teams</div>
            </div>
            <Users className="w-8 h-8 text-green-400" />
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-xl p-6 rounded-2xl border border-yellow-500/30 shadow-lg shadow-yellow-500/10">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold font-mono">
                {stats.pendingTeams || 0}
              </div>
              <div className="text-sm text-gray-300">Pending</div>
            </div>
            <Clock className="w-8 h-8 text-yellow-400" />
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-xl p-6 rounded-2xl border border-green-500/30 shadow-lg shadow-green-500/10">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold font-mono">
                {stats.approvedTeams || 0}
              </div>
              <div className="text-sm text-gray-300">Approved</div>
            </div>
            <Check className="w-8 h-8 text-green-400" />
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-xl p-6 rounded-2xl border border-blue-500/30 shadow-lg shadow-blue-500/10">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold font-mono">
                {stats.verifiedPayments || 0}
              </div>
              <div className="text-sm text-gray-300">Verified</div>
            </div>
            <DollarSign className="w-8 h-8 text-blue-400" />
          </div>
        </div>
      </div>

      <div className="bg-white/5 backdrop-blur-xl p-8 rounded-3xl border border-white/10">
        <h2 className="text-3xl font-bold mb-6 text-center">
          🏆 TOURNAMENT STATUS
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-cyan-400">
              📈 Registration Progress
            </h3>
            <div className="bg-black/30 rounded-lg p-4">
              <div className="flex justify-between mb-2">
                <span>Teams Registered</span>
                <span>{stats.approvedTeams || 0}/32</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-4">
                <div
                  className="bg-gradient-to-r from-green-500 to-blue-500 h-4 rounded-full transition-all duration-500"
                  style={{
                    width: `${((stats.approvedTeams || 0) / 32) * 100}%`,
                  }}
                ></div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-bold text-yellow-400">
              ⚡ Quick Actions
            </h3>
            <div className="space-y-2">
              <button
                onClick={handleGenerateFixtures}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 py-3 rounded-lg font-bold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/30"
              >
                <Shuffle className="w-5 h-5 inline mr-2" />
                🎲 GENERATE FIXTURES
              </button>
              <button
                onClick={loadStats}
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 py-3 rounded-lg font-bold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/30"
              >
                <RefreshCw className="w-5 h-5 inline mr-2" />
                🔄 REFRESH DATA
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const TeamsTab = ({ authToken, showNotification }) => {
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    loadTeams();
  }, []);

  const loadTeams = async () => {
    try {
      const data = await adminAPI.getTeams(authToken);
      setTeams(data);
    } catch (error) {
      showNotification("❌ Failed to load teams", "error");
    }
  };

  const updateTeamStatus = async (teamId, status, paymentVerified) => {
    try {
      await adminAPI.updateTeamStatus(
        authToken,
        teamId,
        status,
        paymentVerified
      );
      showNotification(`✅ Team ${status} successfully!`, "success");
      loadTeams();
      setSelectedTeam(null);
    } catch (error) {
      showNotification("❌ Failed to update team status", "error");
    }
  };

  const filteredTeams =
    statusFilter === "all"
      ? teams
      : teams.filter((team) => team.status === statusFilter);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">👥 TEAM MANAGEMENT</h2>
        <div className="flex space-x-4">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-black/50 border border-cyan-500/50 rounded-lg px-4 py-2 text-white focus:border-cyan-400 focus:outline-none"
          >
            <option value="all">All Teams</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
          <button
            onClick={loadTeams}
            className="bg-blue-600 px-4 py-2 rounded-lg font-bold hover:bg-blue-500 transition-colors duration-300"
          >
            <RefreshCw className="w-4 h-4 inline mr-2" />
            RELOAD
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {filteredTeams.length === 0 ? (
          <div className="bg-white/5 backdrop-blur-xl p-8 rounded-2xl text-center border border-white/10">
            <div className="text-6xl mb-4">📭</div>
            <h3 className="text-2xl font-bold mb-2">No Teams Found</h3>
            <p className="text-gray-400">No teams match the current filter.</p>
          </div>
        ) : (
          filteredTeams.map((team) => (
            <div
              key={team._id}
              className="bg-white/5 backdrop-blur-xl p-6 rounded-2xl border border-white/10"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center space-x-4 mb-3">
                    <h3 className="text-2xl font-bold">{team.teamName}</h3>
                    <span
                      className={`font-bold px-3 py-1 rounded-full text-sm bg-black/30 ${
                        team.status === "approved"
                          ? "text-green-400"
                          : team.status === "pending"
                          ? "text-yellow-400"
                          : "text-red-400"
                      }`}
                    >
                      {team.status.toUpperCase()}
                    </span>
                    {team.paymentVerified ? (
                      <span className="text-green-400 text-sm">💰 PAID</span>
                    ) : (
                      <span className="text-red-400 text-sm">💸 UNPAID</span>
                    )}
                  </div>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      👨‍💼 <strong>Captain:</strong> {team.captainName}
                    </div>
                    <div>
                      🆔 <strong>CNIC:</strong> {team.captainCNIC}
                    </div>
                    <div>
                      📅 <strong>Registered:</strong>{" "}
                      {new Date(team.registrationDate).toLocaleDateString()}
                    </div>
                    <div>
                      🏦 <strong>Bank:</strong> {team.bankName}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col space-y-2 ml-4">
                  <button
                    onClick={() => setSelectedTeam(team)}
                    className="bg-blue-600 px-4 py-2 rounded-lg text-sm font-bold hover:bg-blue-500 transition-colors duration-300"
                  >
                    <Eye className="w-4 h-4 inline mr-1" />
                    VIEW
                  </button>
                  <div className="flex space-x-1">
                    <button
                      onClick={() =>
                        updateTeamStatus(team._id, "approved", true)
                      }
                      className="bg-green-600 px-3 py-1 rounded text-xs hover:bg-green-500 transition-colors duration-300"
                    >
                      <Check className="w-3 h-3" />
                    </button>
                    <button
                      onClick={() =>
                        updateTeamStatus(team._id, "rejected", false)
                      }
                      className="bg-red-600 px-3 py-1 rounded text-xs hover:bg-red-500 transition-colors duration-300"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {selectedTeam && (
        <TeamModal
          team={selectedTeam}
          onClose={() => setSelectedTeam(null)}
          onUpdateStatus={updateTeamStatus}
        />
      )}
    </div>
  );
};

// components/Notification.jsx
const Notification = ({ message, type }) => {
  const colors = {
    success: "bg-green-500/20 border-green-500",
    error: "bg-red-500/20 border-red-500",
    warning: "bg-yellow-500/20 border-yellow-500",
    info: "bg-blue-500/20 border-blue-500",
  };

  return (
    <div
      className={`fixed top-4 right-4 z-50 p-4 rounded-lg max-w-sm transform transition-all duration-300 ${colors[type]} backdrop-blur-xl border-2`}
    >
      <div className="flex items-center space-x-3">
        <div className="text-2xl">
          {type === "success"
            ? "✅"
            : type === "error"
            ? "❌"
            : type === "warning"
            ? "⚠️"
            : "ℹ️"}
        </div>
        <div className="font-semibold">{message}</div>
      </div>
    </div>
  );
};

export { Header, OverviewTab, TeamsTab, Notification };
